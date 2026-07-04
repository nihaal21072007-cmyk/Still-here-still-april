import type { ReactElement } from "react";
import { createFileRoute, notFound } from "@tanstack/react-router";
import { ROOMS } from "@/data/content";
import { Garden } from "@/rooms/Garden";
import { Memories } from "@/rooms/Memories";
import { Letters } from "@/rooms/Letters";
import { Jokes } from "@/rooms/Jokes";
import { Worries } from "@/rooms/Worries";
import { Music } from "@/rooms/Music";
import { Ragebait } from "@/rooms/Ragebait";
import { Birthday } from "@/rooms/Birthday";

const MAP: Record<string, () => ReactElement> = {
  garden: Garden,
  memories: Memories,
  letters: Letters,
  jokes: Jokes,
  worries: Worries,
  music: Music,
  ragebait: Ragebait,
  birthday: Birthday,
};

export const Route = createFileRoute("/$room")({
  beforeLoad: ({ params }) => {
    if (!ROOMS.find(r => r.slug === params.room)) throw notFound();
  },
  head: ({ params }) => {
    const room = ROOMS.find(r => r.slug === params.room);
    return {
      meta: [
        { title: `${room?.title ?? "Room"} — STILL HERE` },
        { name: "description", content: room?.blurb ?? "" },
      ],
    };
  },
  component: RoomPage,
});

function RoomPage() {
  const { room } = Route.useParams();
  const Comp = MAP[room];
  return <Comp />;
}
