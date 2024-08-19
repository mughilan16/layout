import clients from "@/data/clients.json"

export async function GET() {
  const data = {clients: clients};
  return Response.json(data);
}
