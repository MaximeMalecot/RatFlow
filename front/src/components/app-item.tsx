import { Link } from "react-router-dom";
import { AppInList } from "../interfaces/app";

interface AppItemProps {
    app: AppInList;
}

export default function AppItem({ app }: AppItemProps) {
    return (
        <Link
            to={`/manage/app/${app._id}`}
            className="card w-66 bg-base-100 shadow-xl image-full"
        >
            <figure>
                <img
                    style={{ height: "200px", width: "100%" }}
                    src={
                        "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=911&q=80"
                    }
                    alt="Shoes"
                />
            </figure>
            <div className="card-body">
                <h2 className="card-title uppercase">{app.name}</h2>
                {/* <p>If a dog chews shoes whose shoes does he choose?</p> */}
                <div className="card-actions mt-auto">
                    <button className="btn btn-primary w-full">Manage</button>
                </div>
            </div>
        </Link>
    );
}
