// "use client";

// import React, { useState, useMemo } from 'react';
// import { ApplicationList } from "./application-list";
// import { ServiceList } from "./service-list";
// import { MachineStats } from "./machine-stats";
// import { MachineImage } from "./machine-image";
// import { motion } from "framer-motion";
// import type { Service, Machines, Application as AppType } from "@/types/machines";

// interface MachineDetailsClientProps {
//     machine: Machines;
// }

// export function MachineDetailsClient({ machine }: MachineDetailsClientProps) {
//     const [selectedApplicationName, setSelectedApplicationName] = useState("");

//     const handleApplicationClick = (appName: string) => {
//         setSelectedApplicationName(appName === selectedApplicationName ? "" : appName);
//     };

//     const allServices = useMemo(() => {
//         return machine.applications.flatMap((app) => app.services);
//     }, [machine.applications]);

//     const statsData = useMemo(() => {
//         const totalServices = allServices.length;
//         const okServices = allServices.filter((service) => service.status === "Concluida").length;
//         const pendentes = totalServices - okServices;
//         const healthPercentage = totalServices > 0 ? Math.round((okServices / totalServices) * 100) : 0;

//         return {
//             total: totalServices,
//             percent: healthPercentage,
//             pendentes,
//             instalados: okServices
//         };
//     }, [allServices]);

//     const applicationsList = useMemo(() => {
//         return machine.applications.map(app => {
//             const total = app.services.length;
//             const concluidos = app.services.filter(s => s.status === "Concluida").length;
//             const percent = total > 0 ? Math.round((concluidos / total) * 100) : 0;
//             return {
//                 ...app,
//                 subItems: total,
//                 percent,
//                 instalados: concluidos,
//                 totalServices: total,
//             };
//         });
//     }, [machine.applications]);

//     const mainInfo = useMemo(() => {
//         return {
//             name: machine.name,
//             description: machine.description || "",
//             system: machine.version || "Z/OS 3.1",
//             status: machine.status || "Concluida",
//             update: machine.updatedAt || "12/09/2025"
//         };
//     }, [machine]);
    
//     const displayedServices = useMemo(() => {
//         if (selectedApplicationName) {
//             const app = machine.applications.find(a => a.name === selectedApplicationName);
//             return app ? app.services : [];
//         }
//         return allServices;
//     }, [selectedApplicationName, machine.applications, allServices]);

//     return (
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-start">
//             <motion.div
//                 className="md:col-span-1"
//                 initial={{ opacity: 0, x: -40 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ duration: 0.6, ease: "easeOut" }}
//             >
//                 <ApplicationList
//                     applications={applicationsList}
//                     onSelectApp={handleApplicationClick}
//                     selectedApp={selectedApplicationName}
//                 />
//             </motion.div>
//             <motion.div
//                 className="md:col-span-2 flex flex-col items-center gap-8"
//                 initial={{ opacity: 0, y: 40 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
//             >
//                 <MachineStats
//                     total={statsData.total}
//                     percent={statsData.percent}
//                     pendentes={statsData.pendentes}
//                     instalados={statsData.instalados}
//                     offsetY={20}
//                 />
//                 <motion.div
//                     initial={{ opacity: 0, scale: 0.95 }}
//                     animate={{ opacity: 1, scale: 1 }}
//                     transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
//                 >
//                     <MachineImage {...mainInfo} offsetY={20} />
//                 </motion.div>
//             </motion.div>
//             <motion.div
//                 className="md:col-span-1"
//                 initial={{ opacity: 0, x: 40 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
//             >
//                 <ServiceList services={displayedServices} />
//             </motion.div>
//         </div>
//     );
// }


// src/components/machines/machine-details-client.tsx

// src/components/machines/machine-details-client.tsx

"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { ApplicationList } from "./application-list";
import { ServiceList } from "./service-list";
import { MachineStats } from "./machine-stats";
import { MachineImage } from "./machine-image";
import { motion } from "framer-motion";
import type { Service, Machines, Application as AppType } from "@/types/machines";
import { Loader2 } from "lucide-react";

interface MachineDetailsClientProps {
    machineId: string; // Recebe apenas o ID da máquina
}

export function MachineDetailsClient({ machineId }: MachineDetailsClientProps) {
    const [machine, setMachine] = useState<Machines | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedApplicationName, setSelectedApplicationName] = useState("");

    const fetchMachineDetails = async () => {
        setIsLoading(true);
        try {
            const fetchedMachine = await window.electronAPI.getMachineById(machineId);
            setMachine(fetchedMachine);
        } catch (error) {
            console.error("Falha ao carregar a máquina:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchMachineDetails();
    }, [machineId]);

    const handleApplicationClick = (appName: string) => {
        setSelectedApplicationName(appName === selectedApplicationName ? "" : appName);
    };

    const allServices = useMemo(() => {
        return machine?.applications.flatMap((app) => app.services) || [];
    }, [machine]);

    const statsData = useMemo(() => {
        const totalServices = allServices.length;
        const okServices = allServices.filter((service) => service.status === "Concluida").length;
        const pendentes = totalServices - okServices;
        const healthPercentage = totalServices > 0 ? Math.round((okServices / totalServices) * 100) : 0;

        return {
            total: totalServices,
            percent: healthPercentage,
            pendentes,
            instalados: okServices
        };
    }, [allServices]);

    const applicationsList = useMemo(() => {
        return machine?.applications.map(app => {
            const total = app.services.length;
            const concluidos = app.services.filter(s => s.status === "Concluida").length;
            const percent = total > 0 ? Math.round((concluidos / total) * 100) : 0;
            return {
                ...app,
                subItems: total,
                percent,
                instalados: concluidos,
                totalServices: total,
            };
        }) || [];
    }, [machine]);

    const mainInfo = useMemo(() => {
        if (!machine) return null;
        return {
            name: machine.name,
            description: machine.description || "",
            system: machine.version || "Z/OS 3.1",
            status: machine.status || "Concluida",
            update: machine.updatedAt || "12/09/2025"
        };
    }, [machine]);
    
    const displayedServices = useMemo(() => {
        if (selectedApplicationName) {
            const app = machine?.applications.find(a => a.name === selectedApplicationName);
            return app ? app.services : [];
        }
        return allServices;
    }, [selectedApplicationName, machine?.applications, allServices]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen text-gray-400">
                <Loader2 className="animate-spin mr-2" /> Carregando detalhes da máquina...
            </div>
        );
    }

    if (!machine || !mainInfo) {
        return (
            <div className="flex items-center justify-center h-screen">
                <h1 className="text-2xl text-white">Máquina não encontrada</h1>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-start">
            <motion.div
                className="md:col-span-1"
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                <ApplicationList
                    machine={ 
                        { 
                            name: machine.name, 
                            system: machine.version || "Desconhecido",
                            description: machine.description || "Desconhecido"
                        } }
                    applications={applicationsList}
                    onSelectApp={handleApplicationClick}
                    selectedApp={selectedApplicationName}
                />
            </motion.div>
            <motion.div
                className="md:col-span-2 flex flex-col items-center gap-8"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
            >
                <MachineStats
                    total={statsData.total}
                    percent={statsData.percent}
                    pendentes={statsData.pendentes}
                    instalados={statsData.instalados}
                    offsetY={20}
                />
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
                >
                    <MachineImage {...mainInfo} offsetY={20} />
                </motion.div>
            </motion.div>
            <motion.div
                className="md:col-span-1"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
            >
                <ServiceList services={displayedServices} />
            </motion.div>
        </div>
    );
}