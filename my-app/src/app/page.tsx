import variables from "./variables.module.scss"

export default function Home() {
  return (
    <div className="flex items-center justify-center w-full h-full">
     <main className="font-bold" style={{ color: variables.primaryColor }}>This is the Dashboard page.</main>
    </div>
  );
}
