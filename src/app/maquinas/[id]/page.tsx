import { mockMachines } from "@/mocks/mockMachines";

// Export the generateStaticParams function
export async function generateStaticParams() {
  return mockMachines.map((machine) => ({
    id: machine.id,
  }));
}

// Recebe params do Next.js (Server Component)
export default async function MachineDetailsPage({ params }: { params: { id: string } }) {
    const awaitedParams = await params;
    const machineId = awaitedParams.id;
    const machine = mockMachines.find((m) => m.id === machineId);

    if (!machine) {
        return (
            <div className="flex items-center justify-center h-screen">
                <h1 className="text-2xl text-white">Máquina não encontrada</h1>
            </div>
        );
    }

    //Calcula estatísticas da máquina
    const allServices = machine.applications.flatMap((app) => app.services);
    const totalServices = allServices.length;
    const okServices = allServices.filter((service) => service.status === "Concluida").length;
    const healthPercentage = totalServices > 0 ? Math.round((okServices / totalServices) * 100) : 0;

    return (
        <section className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8 mt-4">
            {/* Cabeçalho */}
            <div className="bg-[#1A1A1E] rounded-lg p-6 mb-6 border border-[#323238] md:col-span-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-2">{machine.name}</h1>
                        <p className="text-gray-400">{machine.description}</p>
                    </div>
                    <div className="text-right">
                        <div className={`text-lg font-semibold ${healthPercentage >= 80 ? "text-green-500" : healthPercentage >= 50 ? "text-yellow-500" : "text-red-500"}`}>
                            Saúde: {healthPercentage}%
                        </div>
                        <div className="text-gray-400 text-sm">
                            Status: {okServices} de {totalServices} serviços ativos
                        </div>
                    </div>
                </div>
            </div>

            {/* Lista de Aplicações */}
            {machine.applications.map((app) => (
                <div key={app.name} className="bg-[#1A1A1E] rounded-lg p-6 border border-[#323238]">
                    <h2 className="text-xl font-semibold text-white mb-4">{app.name}</h2>
                    <div className="grid gap-4">
                        {app.services.map((service, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-between p-4 bg-[#242428] rounded-lg"
                            >
                                <div>
                                    <h3 className="text-white font-medium">{service.name}</h3>
                                    <p className="text-sm text-gray-400">{service.name}</p>
                                </div>
                                <div
                                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                                        service.status === "Concluida" ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"
                                    }`}
                                >
                                    {service.status}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </section>
    );
}