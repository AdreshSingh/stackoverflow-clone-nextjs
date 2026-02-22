import { QuestionDetail } from "@/components/question-detail";

export default async function AskPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <div>
      <h1>Ask a Question</h1>
      <QuestionDetail questionId={id} />
    </div>
  );
}
