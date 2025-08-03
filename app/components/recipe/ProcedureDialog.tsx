"use client";
import { useQuery } from "@tanstack/react-query";
import { ProcedureResponse } from "@/types";
import { fetchProcedure } from "@/lib/apis";

export default function ProcedureDialog({ recipeId }: { recipeId: number }) {
  const { data, isLoading, isError } = useQuery<ProcedureResponse>({
    queryKey: ["procedure", recipeId],
    queryFn: () => fetchProcedure(recipeId),
    enabled: !!recipeId,
  });

  if (isLoading) {
    return (
      <div className="space-y-4 animate-pulse">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-4 w-full bg-slate-200 rounded"></div>
        ))}
      </div>
    );
  }

  if (isError) return <p className="text-red-500">Error loading steps.</p>;

  return (
    <ol className="list-decimal pl-5 text-slate-600 space-y-3">
      {data?.steps.map((step, i) => (
        <li key={i}>{step}</li>
      ))}
    </ol>
  );
}
