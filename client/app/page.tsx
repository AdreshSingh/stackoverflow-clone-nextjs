"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { questions } from "@/constants/question-list";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";

import axiosInstance from "@/lib/axios-instance";

export default function Home() {
  const router = useRouter();
  const [question, setQuestion] = useState<any[]>([]);
  const [loading, setloading] = useState(true);
  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const res = await axiosInstance.get("/question/getallquestion");
        setQuestion(res.data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setloading(false);
      }
    };
    fetchQuestion();
  }, []);

  return (
    <main className="min-w-0">
      <div className="flex flex-col items-start justify-between gap-4 mb-6 sm:flex-row sm:items-center">
        <h1 className="text-xl font-semibold lg:text-2xl">Top Questions</h1>
        <button
          onClick={() => router.push("/ask")}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700 whitespace-nowrap"
        >
          Ask Question
        </button>
      </div>
      <div className="w-full">
        <div className="flex flex-col items-start px-1 py-2 mb-4 text-sm sm:flex-row sm:items-center sm:gap-4">
          <span className="text-gray-600">{questions.length} questions</span>
          <div className="flex flex-wrap gap-1 sm:gap-2">
            <button className="px-2 py-1 text-xs text-gray-700 bg-gray-200 rounded sm:px-3 sm:text-sm">
              Newest
            </button>
            <button className="px-2 py-1 text-xs text-gray-600 rounded sm:px-3 hover:bg-gray-100 sm:text-sm">
              Active
            </button>
            <button className="flex items-center px-2 py-1 text-xs text-gray-600 rounded sm:px-3 hover:bg-gray-100 sm:text-sm">
              Bountied
              <Badge variant="secondary" className="ml-1 text-xs">
                25
              </Badge>
            </button>
            <button className="px-2 py-1 text-xs text-gray-600 rounded sm:px-3 hover:bg-gray-100 sm:text-sm">
              Unanswered
            </button>
            <button className="px-2 py-1 text-xs text-gray-600 rounded sm:px-3 hover:bg-gray-100 sm:text-sm">
              More ▼
            </button>
            <button className="px-2 py-1 ml-auto text-xs text-gray-600 border border-gray-300 rounded sm:px-3 hover:bg-gray-50 sm:text-sm">
              🔍 Filter
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {loading ? (
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
          ) : question?.length > 0 ? (
            question.map((question: any) => (
              <QuestionCard key={question._id} question={question} />
            ))
          ) : (
            <div className="text-center text-gray-600">No questions found.</div>
          )}
        </div>
      </div>
    </main>
  );
}

function QuestionCard({ question }: { question: any }) {
  return (
    <div key={question.id} className="pb-4 border-b border-gray-200">
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="flex items-center gap-4 text-sm text-gray-600 sm:flex-col sm:items-center sm:w-16 lg:w-20 sm:gap-2">
          <div className="text-center">
            <div className="font-medium">{question?.upvote?.length}</div>
            <div className="text-xs">votes</div>
          </div>
          <div className="text-center">
            <div
              className={`font-medium ${
                question?.answer?.length > 0
                  ? "text-green-600 bg-green-100 px-2 py-1 rounded"
                  : ""
              }`}
            >
              {question.noofanswer}
            </div>
            <div className="text-xs">
              {question.noofanswer === 1 ? "answer" : "answers"}
            </div>
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <Link
            href={`/questions/${question._id}`}
            className="block mb-2 text-base font-medium text-blue-600 hover:text-blue-800 lg:text-lg"
          >
            {question.questiontitle}
          </Link>
          <p className="mb-3 text-sm text-gray-700 line-clamp-2">
            {question.questionbody}
          </p>

          <div className="flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-center">
            <div className="flex flex-wrap gap-1">
              {question.questiontags?.map((tag: any) => (
                <div key={tag}>
                  <Badge
                    variant="secondary"
                    className="text-xs text-blue-800 bg-blue-100 cursor-pointer hover:bg-blue-200"
                  >
                    {tag}
                  </Badge>
                </div>
              ))}
            </div>

            <div className="flex items-center text-xs text-gray-600 shrink-0">
              <Link
                href={`/users/${question.userid}`}
                className="flex items-center"
              >
                <Avatar className="w-4 h-4 mr-1">
                  <AvatarFallback className="text-xs">
                    {question?.userposted?.[0]}
                  </AvatarFallback>
                </Avatar>
                <span className="mr-1 text-blue-600 hover:text-blue-800">
                  {question?.userposted}
                </span>
              </Link>

              <span>
                asked {new Date(question?.askedon).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
