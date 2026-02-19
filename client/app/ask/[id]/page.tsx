import { QuestionDetail } from "@/components/question-detail";

type id = {
  params: Promise<{ slug: string }>;
};

export default function AskPage(id: id) {
  return (
    <div>
      <h1>Ask a Question</h1>
      <QuestionDetail questionId={1} />
    </div>
  );
}
