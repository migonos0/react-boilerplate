import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Custom hook meant to handle external service requests.
 * @param requester Async function that request to the external service. The requester cannot return undefined.
 * @param sideEffects Object containing functions that are meant to be executed on:
 * - Successful request (onSuccess).
 * - Failed request (onError).
 * @returns Object containing:
 * - Handle request: Function that handles the request by setting the local input
 * thus triggering the effect that executes the request.
 * - Loading: Flag that indicates whether the request is or is not loading.
 * - Success: Flag that indicates whether the request was or was not successful.
 * - Error: Error if occurred.
 * - Response: Response on successful request.
 */
export const useServiceRequest = <T, U>(
  requester: (input: T) => Promise<U>,
  sideEffects?: {
    onSuccess?: (response: U) => void;
    onError?: (error: unknown) => void;
  }
) => {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<U | undefined>();
  const [error, setError] = useState<undefined | unknown>();
  const [localInput, setLocalInput] = useState<T | undefined>();
  const isRequestSubscribed = useRef(true);

  useEffect(() => {
    if (!localInput) {
      return;
    }
    setLoading(true);
    requester(localInput)
      .then((response2) => {
        if (!isRequestSubscribed.current) {
          return;
        }
        setResponse(response2);
        setLoading(false);
      })
      .catch((error2) => {
        if (!isRequestSubscribed.current) {
          return;
        }
        setError(error2);
        setLoading(false);
      });

    return () => {
      isRequestSubscribed.current = false;
    };
  }, [localInput, requester]);
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

  const handleRequest = useCallback((input: T) => {
    setLocalInput(input);
  }, []);

  return { handleRequest, loading, response, error, success: !!response };
};
