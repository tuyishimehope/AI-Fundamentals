import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { FaArrowUp } from "react-icons/fa";

export type FormData = {
  prompt: string;
};
type props = {
  onSubmit: (data: FormData) => void;
};

const ChatInput = ({ onSubmit }: props) => {
  const { register, handleSubmit, reset, formState } = useForm<FormData>();

  const submit = handleSubmit((data) => {
    reset({ prompt: "" });
    onSubmit(data);
  });

  const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  };
  return (
    <form
      onSubmit={submit}
      onKeyDown={handleKeyDown}
      className="flex flex-col gap-2 items-end border-2 p-4 rounded-3xl"
    >
      <textarea
        {...register("prompt", {
          required: true,
          validate: (data) => data.trim().length > 0,
        })}
        autoFocus
        className="w-full border-0 focus:outline-0 resize-none"
        placeholder="Ask anything"
        maxLength={1000}
      />
      <Button disabled={!formState.isValid} className="rounded-full w-9 h-9">
        <FaArrowUp />
      </Button>
    </form>
  );
};

export default ChatInput;
