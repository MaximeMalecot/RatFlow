import { Link } from "react-router-dom";

const BgImage =
    "https://images.unsplash.com/photo-1685519825719-e3c7abb18b81?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80";
export default function Home() {
    return (
        <div
            className="hero min-h-screen"
            style={{
                backgroundImage: `url(${BgImage})`,
            }}
        >
            <div className="hero-content text-center">
                <div className="max-w-md">
                    <h1 className="text-5xl text-white font-bold">
                        Get data about how people use your app
                    </h1>
                    <p className="py-6  text-white ">
                        Know what’s happening at every touchpoint of your users’
                        journey. No guesswork required.
                    </p>
                    <div className="flex gap-3 justify-center">
                        {/* <button className="btn btn-primary">Get Started</button> */}
                        <Link to="/register" className="btn btn-primary">
                            Try it for free
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
