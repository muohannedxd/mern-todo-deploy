export default function NoMatch() {
  return (
    <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-center
        flex flex-col gap-10">
      <p className="font-semibold text-5xl">Error 404</p>
      <p className="font-semibold text-xl">The page you are looking for does not exist</p>
    </div>
  );
}
