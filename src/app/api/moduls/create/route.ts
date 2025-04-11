import { NextResponse, NextRequest } from "next/server";
import { getSession } from "@/app/lib/session";
import { createModul } from "@/app/lib/data-access/moduldal";
import { validateModulInput } from "@/app/lib/validation/modulValidation";
