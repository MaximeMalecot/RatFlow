import { Link } from "react-router-dom";
import FullLogo from "../assets/full-logo.png";
import { YellowBtn } from "../components/yellow-btn";
import { SDK_LINKS } from "../constants/links";
import { useAuthContext } from "../contexts/auth.context";

export default function Header() {
    const { isConnected, data, logout } = useAuthContext();

    return (
        <header>
            <div className="navbar bg-base-100 px-10 md:px-20">
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
                        <li className="hidden md:block">
                            <details>
                                <summary>Libraries</summary>
                                <ul className="p-2 bg-base-100">
                                    <li>
                                        <a
                                            target="_blank"
                                            href={SDK_LINKS.FRONT}
                                        >
                                            Front
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            target="_blank"
                                            href={SDK_LINKS.REACT}
                                        >
                                            React
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            target="_blank"
                                            href={SDK_LINKS.BACK}
                                        >
                                            Back
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            target="_blank"
                                            href={SDK_LINKS.EXPRESS}
                                        >
                                            EXPRESS
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            target="_blank"
                                            href={SDK_LINKS.NESTJS_MS}
                                        >
                                            NestJS MS
                                        </a>
                                    </li>
                                </ul>
                            </details>
                        </li>
                    </ul>
                    <div className="flex-1">
                        {isConnected ? (
                            <div className="flex items-center gap-4">
                                <ul className="menu menu-horizontal px-1">
                                    <li className="hidden md:block">
                                        <details>
                                            <summary>{data!.email}</summary>
                                            <ul className="p-2 bg-base-100">
                                                <li>
                                                    <Link to="/account">
                                                        Account
                                                    </Link>
                                                </li>
                                                <li onClick={logout}>
                                                    <p>Logout</p>
                                                </li>
                                            </ul>
                                        </details>
                                    </li>
                                </ul>
                                <Link to={"/dashboard"}>
                                    <YellowBtn>Dashboard</YellowBtn>
                                </Link>
                            </div>
                        ) : (
                            <Link to={"/register"}>
                                <YellowBtn>Try</YellowBtn>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}
