import { Link } from "react-router-dom";
import FullLogo from "../assets/full-logo.png";
import { useAuthContext } from "../contexts/auth.context";

export default function Header() {
    const { isConnected } = useAuthContext();

    return (
        <header>
            <div className="navbar bg-base-100 px-20">
                <div className="flex-1">
                    <Link
                        to="/"
                        className=""
                        style={{
                            height: "70px",
                            width: "140px",
                        }}
                    >
                        <img
                            src={FullLogo}
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "contain",
                            }}
                            alt="Ratflow logo"
                        />
                    </Link>
                </div>
                <div className="flex-none">
                    <ul className="menu menu-horizontal px-1">
                        <li>
                            <a>Link</a>
                        </li>
                        <li>
                            <details>
                                <summary>Parent</summary>
                                <ul className="p-2 bg-base-100">
                                    <li>
                                        <a>Link 1</a>
                                    </li>
                                    <li>
                                        <a>Link 2</a>
                                    </li>
                                </ul>
                            </details>
                        </li>
                        <li className="flex-1">
                            {!isConnected ? (
                                <Link
                                    to={"/dashboard"}
                                    className="flex justify-center btn bg-yellow normal-case text-md h-fit"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <Link
                                    to={"/login"}
                                    className="btn bg-yellow normal-case text-md h-fit"
                                >
                                    Try
                                </Link>
                            )}
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    );
}
