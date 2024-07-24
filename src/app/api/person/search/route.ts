export const dynamic = 'force-dynamic'

import { db } from '@vercel/postgres';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  // connect to the db
  const client = await db.connect();

  // get query params
  const url = new URL(req.url);
  const searchString = url.searchParams.get('query') || '';
  const page = parseInt(url.searchParams.get('page') || '1');
  const pageSize = 5;

  // calculate offset
  const offset = (page - 1) * pageSize;

  const personTable = await client.sql`
    SELECT * FROM person
    WHERE
      first_name ILIKE '%' || ${searchString} || '%' OR
      last_name ILIKE '%' || ${searchString} || '%' OR
      company ILIKE '%' || ${searchString} || '%' OR
      address ILIKE '%' || ${searchString} || '%' OR
      city ILIKE '%' || ${searchString} || '%' OR
      state ILIKE '%' || ${searchString} || '%' OR
      zip_phone ILIKE '%' || ${searchString} || '%'
    LIMIT ${pageSize} OFFSET ${offset};
  `;

  return NextResponse.json({
    personTable: personTable.rows,
    pageSize,
  });
}
