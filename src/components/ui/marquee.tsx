
import { cn } from "@/lib/utils";
import { Marquee } from "@/components/magicui/marquee";
import Test from "@/assets/testimonmal.jpg"
const reviews = [
  {
    name: "Jack",
    username: "@jack",
    body: "I've never seen anything like this before. It's amazing. I love it.",
    img: "https://avatar.vercel.sh/jack",
    image: Test
  },
  {
    name: "Jill",
    username: "@jill",
    body: "I don't know what to say. I'm speechless. This is amazing.",
    img: "https://avatar.vercel.sh/jill",
  },
  {
    name: "John",
    username: "@john",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatar.vercel.sh/john",
  },
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({
  img,
  name,
  username,
  body,
  image,
}: {
  img: string;
  name: string;
  username: string;
  body: string;
  image?: string;
}) => {
  return (
    <figure
      className={cn(
        "relative h-full w-fit sm:w-full cursor-pointer overflow-hidden bg-neutral-800 pixel-border shadow-[4px_4px_0_#000] hover:shadow-[6px_6px_0_#000] rounded-xl border p-6",
        "border-gray-950/[.1]"
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <img className="rounded-full" width="32" height="32" alt={name} src={img} />
        <div className="flex flex-col">
          <figcaption className="text-sm dark:text-white">{name}</figcaption>
          <p className="text-xs font-medium dark:text-white/40">{username}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm text-white">{body}</blockquote>

      {image && (
        <img
          src={image}
          alt="testimonial"
          className="mt-4 rounded-md object-cover w-90 h-auto"
        />
      )}
    </figure>
  );
};


export function MarqueeDemoVertical() {
  return (
    <div className="relative flex h-[500px] w-full flex-row items-center justify-center overflow-hidden">
      <Marquee pauseOnHover vertical className="[--duration:20s] ">
        {firstRow.map((review) => (
          <ReviewCard key={review.username} {...review}  />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover vertical className="[--duration:20s] dden sm:flex">
        {secondRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
       <div className="pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-neutral-900"></div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-neutral-900"></div>
    </div>
  );
}
