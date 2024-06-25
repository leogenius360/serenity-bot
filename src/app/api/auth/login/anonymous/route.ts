
import { loginAnonymously } from '@/lib/authService';
import { FirebaseError } from 'firebase/app';

export async function POST(req: Request) {
  const reqData = await req.json();
  console.log(`Request data: ${reqData}`)
  try {
    const user = await loginAnonymously();
    return Response.json({user: user});
  } catch (error) {
    if (error instanceof FirebaseError) {
      const match = error.message.match(/: (.*?)(?=\()/);
      const errorMessage = match ? match[1].trim() : "Something went wrong... please try again!";
      if (!(errorMessage.split(" ").length > 1)) {
        return Response.json({ error: error.code.substring(5).replaceAll("-", " ") }, { status: 400 });
      }
      return Response.json({ error: errorMessage }, { status: 400 });
    } else return Response.json({ error: "Something went wrong... please try again!" }, { status: 400 })
  }
}
