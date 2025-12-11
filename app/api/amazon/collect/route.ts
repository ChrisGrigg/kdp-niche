import { createAmazonDataService } from "@/libs/amazon/service";
import { createClient } from "@/libs/supabase/server";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { z } from "zod";

const collectRequestSchema = z.object({
  keywords: z.string().min(1),
  category: z.string().optional(),
  method: z.enum(["api", "scraping"]).default("api"),
});

/**
 * POST /api/amazon/collect
 *
 * Initiates Amazon book data collection.
 * Requires authentication.
 */
export async function POST(req: NextRequest) {
  try {
    // Check authentication
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Parse and validate request body
    const body = await req.json();
    const validation = collectRequestSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: "Invalid request", details: validation.error.errors },
        { status: 400 }
      );
    }

    const { keywords, category, method } = validation.data;

    // Initialize data service
    const dataService = createAmazonDataService();

    // Collect books based on method
    const result =
      method === "api"
        ? await dataService.collectBooksViaApi(keywords, category)
        : await dataService.collectBooksViaScraping(keywords, category);

    if (!result.job) {
      return NextResponse.json(
        { error: "Failed to create collection job" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      job: result.job,
      booksCollected: result.books.length,
      message: `Successfully collected ${result.books.length} books`,
    });
  } catch (error: unknown) {
    console.error("Error in collect route:", error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { error: "Internal server error", message: errorMessage },
      { status: 500 }
    );
  }
}

/**
 * GET /api/amazon/collect
 *
 * Get collection job status
 */
export async function GET(req: NextRequest) {
  try {
    // Check authentication
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const jobId = searchParams.get("jobId");

    if (!jobId) {
      return NextResponse.json(
        { error: "jobId parameter is required" },
        { status: 400 }
      );
    }

    const supabaseClient = await createClient();
    const { data, error } = await supabaseClient
      .from("data_collection_jobs")
      .select("*")
      .eq("id", jobId)
      .single();

    if (error || !data) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    return NextResponse.json({
      job: {
        id: data.id,
        jobType: data.job_type,
        status: data.status,
        categoryId: data.category_id,
        parameters: data.parameters,
        booksCollected: data.books_collected,
        errorMessage: data.error_message,
        startedAt: data.started_at,
        completedAt: data.completed_at,
        createdAt: data.created_at,
      },
    });
  } catch (error: unknown) {
    console.error("Error in GET collect route:", error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { error: "Internal server error", message: errorMessage },
      { status: 500 }
    );
  }
}
