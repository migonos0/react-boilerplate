import { useForm } from "react-hook-form";
import { Button } from "./app/components/button";
import { Input } from "./app/components/input";
import { Subtitle } from "./app/components/subtitle";
import { Title } from "./app/components/title";
import { MainLayout } from "./app/layouts/main.layout";
import { usePosts } from "./state/post.state";
import {
  CreatePostInput,
  CreatePostSchema,
} from "./schemas/inputs/create-post.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorMessage } from "./app/components/error-message";
import { useInputRequest } from "./hooks/use-input-request";
import { createPost } from "./services/post.service";
import { useEffect } from "react";

function App() {
  const { posts, addPost } = usePosts();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<CreatePostInput>({
    resolver: zodResolver(CreatePostSchema),
  });
  const { response, setInput } = useInputRequest(createPost);

  useEffect(() => {
    if (!response) return;
    addPost(response);
  }, [response, addPost]);

  return (
    <MainLayout>
      <div className="flex flex-col gap-y-8 p-4">
        <form
          onSubmit={handleSubmit(setInput)}
          className="flex flex-col gap-y-2"
        >
          <Title value="Create" />
          <div className="flex gap-x-1">
            <div>
              <Input
                {...register("author")}
                placeholder="Author"
                className="flex-grow"
              />
              <ErrorMessage error={errors.author?.message} />
            </div>
            <div>
              <Input
                {...register("title")}
                placeholder="Title"
                className="flex-grow"
              />
              <ErrorMessage error={errors.title?.message} />
            </div>
          </div>
          <Button type="submit">Create</Button>
        </form>
        <div className="flex flex-row gap-x-8">
          <div className="flex-1">
            <Title value="Read" />
            <div>
              {posts?.map((post, index) => (
                <div
                  className="flex flex-col border-slate-200 border-2 p-2 rounded-lg"
                  key={index}
                >
                  <div>
                    <Subtitle value={post.author} />
                    <p key={index}>{post.title}</p>
                  </div>
                  <Button>Select</Button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex-1">
            <div>
              <Title value="Update" />
            </div>
            <div>
              <Title value="Delete" />
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default App;
