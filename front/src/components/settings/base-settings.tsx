import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAppContext } from "../../contexts/manage-app.context";
import appService from "../../services/app.service";
import { displayMsg, notify } from "../../utils/toast";

export default function BaseSettings() {
  const { app } = useAppContext();
  const [loading, setLoading] = useState(false);
  const [origins, setOrigins] = useState<string[]>(app.origins);
  const [typedOrigin, setTypedOrigin] = useState<string>("");

  const { register: registerField, handleSubmit } = useForm();

  const removeOrigin = (origin: string) => {
    setOrigins((prev) => prev.filter((o) => o !== origin));
  };

  const addOrigin = () => {
    const origin = typedOrigin.trim();
    try {
      if (origin.length == 0 || origin.trim().length == 0) {
        throw new Error("Origin cannot be empty");
      }
      if (origins.includes(origin)) {
        throw new Error("Origin already exists");
      }

      setOrigins((prev) => [...prev, origin]);
      setTypedOrigin("");
    } catch (e: any) {
      displayMsg(e.message, "error");
    }
  };

  const updateOrigins = async () => {
    try {
      setLoading(true);
      await appService.updateAppOrigins(app._id, origins);
      notify("Origins updated");
    } catch (e: any) {
      displayMsg(e.message, "error");
    } finally {
      setLoading(false);
    }
  };

  const updateAppName = async (data: any) => {
    try {
      setLoading(true);
      await appService.updateAppName(app._id, data.name);
      notify("App name changed");
    } catch (e: any) {
      displayMsg(e.message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex flex-col gap-1">
      <h3 className="text-xl ml-1">About your app</h3>
      <div className="flex flex-col gap-3 border-2 border-slate-200 p-3 rounded rounded-xl">
        <form
          className="flex flex-col gap-3"
          onSubmit={handleSubmit(updateAppName)}
        >
          <div className="w-full">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              className={
                "input input-bordered w-full !outline-none outline-0 !border-1 !border-slate-300 "
              }
              {...registerField("name", {
                required: true,
                value: app.name,
              })}
            />
          </div>
          {!loading ? (
            <button type="submit" className="btn btn-primary w-full">
              Apply
            </button>
          ) : (
            <button disabled className="btn btn-primary w-full">
              Processing
            </button>
          )}
        </form>
        <div className="divider my-0" />
        <div className="flex flex-col gap-3">
          <label className="label">
            <span className="label-text">Origin(s) allowed</span>
          </label>
          {origins.length == 0 ? (
            <p>There is no origin specified for your app</p>
          ) : (
            <div className="flex gap-5">
              {origins.map((origin, key) => (
                <div
                  key={key}
                  onClick={() => removeOrigin(origin)}
                  className="badge badge-secondary badge-outline cursor-pointer"
                >
                  {origin}
                </div>
              ))}
            </div>
          )}
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-3">
              <input
                type="text"
                className={
                  "input input-bordered w-4/5 !outline-none outline-0 !border-1 !border-slate-300 "
                }
                placeholder="Add origin"
                value={typedOrigin}
                onChange={(e) => setTypedOrigin(e.currentTarget.value)}
                onKeyDown={(e) => {
                  if (e.key == "Enter") {
                    addOrigin();
                    e.currentTarget.value = "";
                  }
                }}
              />
              <button onClick={addOrigin} className="btn btn-primary w-1/5">
                Add
              </button>
            </div>

            {!loading ? (
              <button
                onClick={updateOrigins}
                className="btn btn-primary w-full"
              >
                Apply new origins
              </button>
            ) : (
              <button disabled className="btn btn-primary w-full">
                Processing
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
