import Services from "@/components/Services";
import { Navbar } from "@/components/Navbar";

const service = () => {
    return (
        <div className=" bg-black">
            <Navbar /><br/>
            <main className="container text-white mx-auto px-4">
                <Services/>
            </main>
        </div>
    )
}

export default service