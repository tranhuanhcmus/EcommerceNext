import { NextRequest } from 'next/server';
import server from '@/graphql/server';

export async function POST(req: NextRequest) {
  return server(req);
}

export async function GET(req: NextRequest) {
  return server(req);
}

export async function PATCH(req: NextRequest) {
  return server(req);
}

export async function DELETE(req: NextRequest) {
  return server(req);
}
