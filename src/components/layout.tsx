import Header from "./header";
// import Footer from './footer'
import styles from "@/styles/layout.module.css";
import { Poppins } from "next/font/google";

const poppins = Poppins({ weight: "400", style: "normal", subsets: ["latin"] });

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
      className={poppins.className}
    >
      <div className={styles.main}>
        <Header />
        <main style={{ display: "flex", flexGrow: "1" }}>{children}</main>
      </div>
    </div>
  );
}
