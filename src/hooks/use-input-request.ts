import { useEffect, useRef, useState } from "react";

/**
 * Custom hook meant to handle external service requests that takes inputs.
 *
 * It was written to be used in pair with the 'handleSubmit' function of use hook form. Because of this
 * the function 'setInput', that triggers the request execution can be passed directly to 'handleSubmit'.
 *
 * @param requester Async function that request to the external service. The requester cannot return undefined.
 *
 * @param sideEffects Object containing functions that are meant to be executed on:
 * - Successful request (onSuccess).
 * - Failed request (onError).
 *
 * @returns Object containing:
 * - Handle request: Function that handles the request by setting the local input
 * thus triggering the effect that executes the request.
 * - Loading: Flag that indicates whether the request is or is not loading.
 * - Success: Flag that indicates whether the request was or was not successful.
 * - Error: Error if occurred.
 * - Response: Response on successful request.
 */
export const useInputRequest = <T, U>(
  requester: (input: T) => Promise<U>,
  sideEffects?: {
    onSuccess?: (response: U) => void;
    onError?: (error: unknown) => void;
  }
) => {
  const [isLoading, setIsLoading] = useState(false);
  const [input, setInput] = useState<T | undefined>();
  const isRequestSubscribed = useRef(true);

  const [response, setResponse] = useState<U | undefined>();
  const [error, setError] = useState<undefined | unknown>();

  const reset = () => {
    setIsLoading(false);
    setInput(undefined);
  };

  useEffect(() => {
    if (!input) {
      return;
    }
    setIsLoading(true);
    requester(input)
      .then((response2) => {
        if (!isRequestSubscribed.current) {
          return;
        }
        setResponse(response2);
        reset();
      })
      .catch((error2) => {
        if (!isRequestSubscribed.current) {
          return;
        }
        setError(error2);
        reset();
      });

    return () => {
      isRequestSubscribed.current = false;
    };
  }, [input, requester]);
  useEffect(() => {
    if (!response || !sideEffects?.onSuccess) {
      return;
    }
    sideEffects.onSuccess(response);
  }, [response, sideEffects]);
  useEffect(() => {
    if (!error || !sideEffects?.onError) {
      return;
    }
    sideEffects.onError(error);
  }, [error, sideEffects]);

  return {
    setInput,
    isLoading,
    response,
    error,
    isSuccessful: !!response,
    isFailed: !!error,
  };
};
