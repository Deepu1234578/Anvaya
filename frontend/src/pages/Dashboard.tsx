import StatCard from "../components/dashboard/StatCard";

function Dashboard() {
  return (
    <main className="space-y-8">
      <div>
        <p className="text-sm font-medium text-slate-500">
          Overview
        </p>

        <h1 className="mt-1 text-3xl font-bold text-slate-900">
          NER Logistics Intelligence
        </h1>

        <p className="mt-2 text-slate-500">
          Monitor transportation, accessibility and logistics
          conditions across the North Eastern Region.
        </p>
      </div>

      <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Monitored Routes"
          value="12,450"
          description="Across the NER network"
          icon="⇄"
        />

        <StatCard
          title="Active Disruptions"
          value="23"
          description="Require attention"
          icon="⚠"
        />

        <StatCard
          title="Accessibility Index"
          value="72%"
          description="Regional average"
          icon="◎"
        />

        <StatCard
          title="Active Logistics Hubs"
          value="148"
          description="Connected facilities"
          icon="▣"
        />
      </section>

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm xl:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                NER Logistics Network
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Live transportation intelligence map
              </p>
            </div>

            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
              Map
            </span>
          </div>

          <div className="mt-5 flex h-96 items-center justify-center rounded-lg bg-slate-100">
            <div className="text-center">
              <div className="text-5xl">🗺️</div>
              <p className="mt-3 font-medium text-slate-700">
                Interactive NER Map
              </p>
              <p className="mt-1 text-sm text-slate-500">
                Map integration coming next
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">
            Active Disruptions
          </h2>

          <div className="mt-5 space-y-4">
            <div className="rounded-lg border border-red-100 bg-red-50 p-4">
              <div className="flex gap-3">
                <span>🔴</span>
                <div>
                  <p className="font-medium text-red-900">
                    Landslide Alert
                  </p>
                  <p className="mt-1 text-xs text-red-700">
                    Route disruption detected
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-yellow-100 bg-yellow-50 p-4">
              <div className="flex gap-3">
                <span>🟡</span>
                <div>
                  <p className="font-medium text-yellow-900">
                    Heavy Rainfall
                  </p>
                  <p className="mt-1 text-xs text-yellow-700">
                    Possible travel delays
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-orange-100 bg-orange-50 p-4">
              <div className="flex gap-3">
                <span>🟠</span>
                <div>
                  <p className="font-medium text-orange-900">
                    Road Maintenance
                  </p>
                  <p className="mt-1 text-xs text-orange-700">
                    Partial route restriction
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Dashboard;