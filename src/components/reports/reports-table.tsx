// src/components/reports/reports-table.tsx
"use client";

import * as React from "react";
import Image from "next/image";
import type {
  CellContext,
  Table as TanstackTable,
} from "@tanstack/react-table";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ReportData } from "@/app/reports/page";
import { toast } from "sonner";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  CalendarIcon,
  ChevronDown,
  FileDown,
  FileText,
  FileSpreadsheet,
  Columns,
  Search,
  Filter,
  Download,
  MoreVertical,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import {
  StatusType,
  ItemObrigatorioType,
  ApplicationType,
} from "@/types/machines";
import { Badge } from "@/components/ui/badge";
import ImgServerStatusConcluida from "@/assets/images/img-server-status-ok.svg";
import ImgServerStatusPendente from "@/assets/images/img-server-status-warning.svg";

//import logoEccoxDark from "@/assets/images/logo-eccox-dark.png";

import { logoBase64 } from "../machines/shared/logo-base64";



// =================================================================
// COMPONENTE DROPDOWN CUSTOMIZADO PARA FILTROS
// =================================================================
const FilterDropdown = ({ 
  label, 
  value, 
  options, 
  onChange, 
  placeholder = "Todos" 
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
  placeholder?: string;
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  
  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 bg-[#1A1A1E] border border-gray-700 rounded-lg text-sm text-gray-300 hover:bg-[#202024] transition-colors min-w-[140px] justify-between cursor-pointer"
      >
        <span className="truncate">{value || placeholder}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <>
          {/* Overlay para fechar o dropdown */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full left-0 right-0 mt-1 bg-[#1A1A1E] border border-gray-700 rounded-lg shadow-xl z-50 max-h-60 overflow-auto table-scrollbar">
            <div 
              className="px-3 py-2 hover:bg-gray-700/50 cursor-pointer text-sm"
              onClick={() => { onChange(""); setIsOpen(false); }}
            >
              {placeholder}
            </div>
            {options.map((option) => (
              <div
                key={option}
                className="px-3 py-2 hover:bg-gray-700/50 cursor-pointer text-sm text-gray-300"
                onClick={() => { onChange(option); setIsOpen(false); }}
              >
                {option}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

// =================================================================
// FUNÇÕES AUXILIARES EXISTENTES
// =================================================================
const getStatusBadgeColor = (status: string) => {
  switch (status) {
    case "Concluída":
      return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/30";
    case "Pendente":
      return "bg-red-500/20 text-red-400 border-red-500/30 hover:bg-red-500/30";
    case "Em andamento":
      return "bg-amber-500/20 text-amber-400 border-amber-500/30 hover:bg-amber-500/30";
    default:
      return "bg-gray-500/20 text-gray-400 border-gray-500/30 hover:bg-gray-500/30";
  }
};

const getRowBorderColor = (status: StatusType) => {
  switch (status) {
    case "Concluída":
      return "border-l-4 border-l-emerald-500/50";
    case "Pendente":
      return "border-l-4 border-l-red-500/50";
    case "Em andamento":
      return "border-l-4 border-l-amber-500/50";
    default:
      return "border-l-4 border-l-transparent";
  }
};

const EditableDateCell = (props: CellContext<ReportData, unknown>) => {
  const {
    getValue,
    row: { original },
    column: { id },
    table,
  } = props;
  const initialValue = getValue() as string;
  const [date, setDate] = React.useState(new Date(initialValue));

  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      setDate(selectedDate);
      (table.options.meta as any)?.updateData(
        original.serviceId,
        id,
        selectedDate.toISOString()
      );
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className="w-full justify-start text-left font-normal p-1 h-auto hover:bg-gray-700/50 hover:text-gray-200 cursor-pointer"
        >
          <CalendarIcon className="mr-2 h-4 w-4 text-gray-400" />
          {format(date, "dd/MM/yyyy", { locale: ptBR })}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 bg-[#1A1A1E] border-gray-700">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleDateSelect}
          className="bg-[#1A1A1E] text-gray-200"
        />
      </PopoverContent>
    </Popover>
  );
};

const EditableCell = (props: CellContext<ReportData, unknown>) => {
  const {
    getValue,
    row: { original },
    column: { id },
    table,
  } = props;
  const initialValue = getValue();
  const [value, setValue] = React.useState<any>(initialValue);

  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const onBlur = () => {
    if (value !== initialValue) {
      (table.options.meta as any)?.updateData(original.serviceId, id, value);
    }
  };

  if (id === "status") {
    return (
      <Select
        value={value}
        onValueChange={(newValue: StatusType) => {
          (table.options.meta as any)?.updateData(
            original.serviceId,
            id,
            newValue
          );
        }}
      >
        <SelectTrigger className="w-full border-none bg-transparent p-0 h-auto focus:ring-0 focus:ring-offset-0 justify-start font-normal cursor-pointer">
          <Badge variant="outline" className={getStatusBadgeColor(value)}>
            {value}
          </Badge>
        </SelectTrigger>
        <SelectContent className="bg-[#1A1A1D] border-gray-700">
          <SelectItem className="cursor-pointer text-gray-100 hover:!bg-gray-700 hover:!text-gray-200" value="Pendente">Pendente</SelectItem>
          <SelectItem className="cursor-pointer text-gray-100 hover:!bg-gray-700 hover:!text-gray-200" value="Em andamento">Em andamento</SelectItem>
          <SelectItem className="cursor-pointer text-gray-100 hover:!bg-gray-700 hover:!text-gray-200" value="Concluída">Concluída</SelectItem>
        </SelectContent>
      </Select>
    );
  }

  if (id === "itemObrigatorio") {
    return (
      <Select
        value={value}
        onValueChange={(newValue: ItemObrigatorioType) => {
          (table.options.meta as any)?.updateData(
            original.serviceId,
            id,
            newValue
          );
        }}
      >
        <SelectTrigger className="bg-transparent border-none focus:ring-1 focus:ring-blue-500 h-auto p-1 text-left cursor-pointer">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="bg-[#1A1A1D] border-gray-700">
          <SelectItem value="Sim" className="cursor-pointer text-gray-100 hover:!bg-gray-700 hover:!text-gray-200">Sim</SelectItem>
          <SelectItem value="Não" className="cursor-pointer text-gray-100 hover:!bg-gray-700 hover:!text-gray-200">Não</SelectItem>
        </SelectContent>
      </Select>
    );
  }

  if (id === "applicationType") {
    return (
      <Select
        value={value}
        onValueChange={(newValue: ApplicationType) => {
          (table.options.meta as any)?.updateData(
            original.serviceId,
            id,
            newValue
          );
        }}
      >
        <SelectTrigger className="bg-transparent border-none focus:ring-1 focus:ring-blue-500 h-auto p-1 text-left cursor-pointer">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="bg-[#1A1A1D] border-gray-700">
          <SelectItem className="cursor-pointer text-gray-100 hover:!bg-gray-700 hover:!text-gray-200" value="ECCOX">ECCOX</SelectItem>
          <SelectItem className="cursor-pointer text-gray-100 hover:!bg-gray-700 hover:!text-gray-200" value="IBM">IBM</SelectItem>
        </SelectContent>
      </Select>
    );
  }

  return (
    <Input
      value={(value as string) ?? ""}
      onChange={(e) => setValue(e.target.value)}
      onBlur={onBlur}
      className="bg-transparent border-none focus-visible:ring-1 focus-visible:ring-blue-500 p-1 h-auto w-full cursor-pointer"
    />
  );
};

const generateDynamicFilename = (table: TanstackTable<ReportData>): string => {
  const baseName = "relatorio_servicos";
  const date = format(new Date(), "yyyy-MM-dd");
  const machineName =
    (table.getColumn("machineName")?.getFilterValue() as string) || "";
  const appType =
    (table.getColumn("applicationType")?.getFilterValue() as string) || "";
  const status = (table.getColumn("status")?.getFilterValue() as string) || "";
  const responsible =
    (table.getColumn("responsible")?.getFilterValue() as string) || "";
  const itemObrigatorio =
    (table.getColumn("itemObrigatorio")?.getFilterValue() as string) || "";

  let fileName = baseName;
  if (machineName)
    fileName += `_${machineName.toLowerCase().replace(/ /g, "_")}`;
  if (appType) fileName += `_${appType.toLowerCase().replace(/ /g, "_")}`;
  if (itemObrigatorio) fileName += `_${itemObrigatorio.toLowerCase()}`;
  if (status) fileName += `_${status.toLowerCase().replace(/ /g, "_")}`;
  if (responsible)
    fileName += `_${responsible.toLowerCase().replace(/ /g, "_")}`;
  fileName += `_${date}`;
  return fileName;
};

// =================================================================
// COMPONENTE PRINCIPAL DA TABELA MELHORADO
// =================================================================
export function ReportsTable({ initialData }: { initialData: ReportData[] }) {
  const [data, setData] = React.useState(initialData);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [showAdvancedFilters, setShowAdvancedFilters] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");

  

  React.useEffect(() => {
    setData(initialData);
  }, [initialData]);

  // Filtros únicos para os dropdowns
  const uniqueTypes = React.useMemo(() => 
    [...new Set(data.map(item => item.applicationType).filter(Boolean))], [data]);
  const uniqueResponsibles = React.useMemo(() => 
    [...new Set(data.map(item => item.responsible).filter(Boolean))], [data]);
  const uniqueMachines = React.useMemo(() => 
    [...new Set(data.map(item => item.machineName).filter(Boolean))], [data]);
  const statusOptions = ["Concluída", "Pendente", "Em andamento"];

  const updateData = async (
    serviceId: string,
    columnId: string,
    value: any
  ) => {
    const promise = async () => {
      const serviceToUpdate = await window.electronAPI.getServiceById(
        serviceId
      );
      if (!serviceToUpdate) throw new Error("Serviço não encontrado.");

      let finalValue: any = value;
      if (columnId === "applicationType") {
        const appToUpdate = await window.electronAPI.getApplicationById(
          serviceToUpdate.application_id!
        );
        if (!appToUpdate) throw new Error("Aplicação não encontrada.");
        const updatedApp = { ...appToUpdate, tipo: value as ApplicationType };
        await window.electronAPI.syncApplication(updatedApp);
      } else {
        const updatedService = { ...serviceToUpdate, [columnId]: finalValue };
        const result = await window.electronAPI.syncService(updatedService);
        if (!result.success) throw new Error(result.message);
      }

      setData((old) =>
        old.map((row) =>
          row.serviceId === serviceId ? { ...row, [columnId]: finalValue } : row
        )
      );
    };
    toast.promise(promise(), {
      loading: "Salvando...",
      success: "Registro atualizado!",
      error: (err) => `Erro: ${err.message}`,
    });
  };

  // const columns: ColumnDef<ReportData>[] = React.useMemo(
  //   () => [
  //     {
  //       id: "statusIcon",
  //       header: "",
  //       cell: ({ row }) => {
  //         const status = row.original.status;
  //         const icon =
  //           status === "Concluída"
  //             ? ImgServerStatusConcluida
  //             : ImgServerStatusPendente;
  //         return (
  //           <Image
  //             src={icon}
  //             alt={status}
  //             width={16}
  //             height={16}
  //             className="mx-auto"
  //           />
  //         );
  //       },
  //       size: 32,
  //     },
  //     { accessorKey: "machineName", header: "Máquina" },
  //     { accessorKey: "applicationName", header: "Aplicação" },
  //     { accessorKey: "serviceName", header: "Serviço" },
  //     { accessorKey: "applicationType", header: "Tipo", cell: EditableCell },
  //     { accessorKey: "status", header: "Status", cell: EditableCell },
  //     { accessorKey: "itemObrigatorio", header: "Obrigatório", cell: EditableCell },
  //     { accessorKey: "responsible", header: "Responsável", cell: EditableCell },
  //     { accessorKey: "responsibleHomologacao", header: "Homologação", cell: EditableCell },
  //     { accessorKey: "updatedAt", header: "Data Entrega", cell: EditableDateCell },
  //     { accessorKey: "comments", header: "Observação", cell: EditableCell },
  //     {
  //       id: "actions",
  //       header: "",
  //       cell: () => (
  //         <DropdownMenu>
  //           <DropdownMenuTrigger asChild>
  //             <Button variant="ghost" size="sm" className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity">
  //               <MoreVertical className="h-4 w-4" />
  //             </Button>
  //           </DropdownMenuTrigger>
  //           <DropdownMenuContent align="end" className="bg-[#1A1A1D] border-gray-700">
  //             <div className="p-2 text-sm text-gray-300">Ações em breve</div>
  //           </DropdownMenuContent>
  //         </DropdownMenu>
  //       ),
  //       size: 40,
  //     },
  //   ],
  //   []
  // );

  const columns: ColumnDef<ReportData>[] = React.useMemo(
      () => [
        // {
        //   id: "statusIcon",
        //   header: "",
        //   cell: ({ row }) => {
        //     const status = row.original.status;
        //     const icon =
        //       status === "Concluída"
        //         ? ImgServerStatusConcluida
        //         : ImgServerStatusPendente;
        //     return (
        //       <div className="flex items-center justify-center w-5 h-5 ">
        //         <Image
        //           src={icon}
        //           alt={status}
        //           width={16}
        //           height={16}
        //           className="flex-shrink-0"
        //         />
        //       </div>
        //     );
        //   },
        //   size: 40,
        //   minSize: 40,
        //   maxSize: 40,
        //   enableResizing: false,
        // },
        { accessorKey: "machineName", header: "Máquina" },
        { accessorKey: "applicationName", header: "Aplicação" },
        { accessorKey: "serviceName", header: "Serviço" },
        { accessorKey: "applicationType", header: "Tipo", cell: EditableCell },
        { accessorKey: "status", header: "Status", cell: EditableCell },
        { accessorKey: "itemObrigatorio", header: "Obrigatório", cell: EditableCell },
        { accessorKey: "responsible", header: "Responsável", cell: EditableCell },
        { accessorKey: "responsibleHomologacao", header: "Homologação", cell: EditableCell },
        { accessorKey: "updatedAt", header: "Data Entrega", cell: EditableDateCell },
        { accessorKey: "comments", header: "Observação", cell: EditableCell },
        {
          id: "actions",
          header: "",
          cell: () => (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-[#1A1A1D] border-gray-700">
                <div className="p-2 text-sm text-gray-300">Ações em breve</div>
              </DropdownMenuContent>
            </DropdownMenu>
          ),
          size: 40,
        },
      ],
      []
    );

  const table = useReactTable({
    data,
    columns,
    state: { sorting, columnFilters, columnVisibility },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    meta: { updateData },
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });

  const exportToExcel = () => {
    try {
      const visibleColumns = table.getVisibleLeafColumns().filter(col => col.id !== 'statusIcon' && col.id !== 'actions');
      const headers = visibleColumns.map(col => col.columnDef.header as string);

      const tableData = table.getFilteredRowModel().rows.map((row) => {
        const dataRow: Record<string, any> = {};
        visibleColumns.forEach((col) => {
          let value = row.getValue(col.id);
          if (col.id === "updatedAt" && value) {
            value = format(new Date(value as string), "dd/MM/yyyy", { locale: ptBR });
          }
          dataRow[col.columnDef.header as string] = value ?? "";
        });
        return dataRow;
      });

      const worksheet = XLSX.utils.json_to_sheet([]);
      XLSX.utils.sheet_add_aoa(worksheet, [headers], { origin: "A1" });
      XLSX.utils.sheet_add_json(worksheet, tableData, {
        origin: "A2",
        skipHeader: true,
      });

      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Relatorio");

      const fileName = `${generateDynamicFilename(table)}.xlsx`;
      XLSX.writeFile(workbook, fileName);

      toast.success("Relatório Excel gerado com sucesso!");
    } catch (error) {
      toast.error("Falha ao gerar o relatório Excel.");
      console.error("Erro no Excel:", error);
    }
  };

  const exportToPdf = () => {
    try {
      // 1. INICIALIZAÇÃO DO DOCUMENTO
      const doc = new jsPDF({ orientation: "landscape" });
      const tableData = table.getFilteredRowModel().rows;
      const totalRecords = tableData.length;
  
      // 2. PREPARAÇÃO DOS DADOS PARA A TABELA
      const head = [
        ['Máquina', 'Aplicação', 'Serviço', 'Tipo', 'Status', 'Obrigatório', 'Responsável', 'Homologação', 'Data Entrega', 'Observação']
      ];
      const body = tableData.map(row => [
        row.original.machineName,
        row.original.applicationName,
        row.original.serviceName,
        row.original.applicationType,
        row.original.status,
        row.original.itemObrigatorio,
        row.original.responsible,
        row.original.responsibleHomologacao,
        format(new Date(row.original.updatedAt), "dd/MM/yyyy"),
        row.original.comments
      ]);
  
      // 3. CÁLCULO DAS MÉTRICAS
      const completed = tableData.filter(row => row.original.status === 'Concluída').length;
      const pending = tableData.filter(row => row.original.status === 'Pendente').length;
      const inProgress = tableData.filter(row => row.original.status === 'Em andamento').length;
  
      // 4. CONSTANTES DE LAYOUT
      const pageWidth = doc.internal.pageSize.getWidth();
      const margin = 15;
  
      // 5. FUNÇÃO AUXILIAR PARA ADICIONAR NÚMEROS DE PÁGINA
      // Executada no final, após todas as páginas serem criadas.
      const addPageNumbers = (doc: jsPDF) => {
        const pageCount = doc.internal.getNumberOfPages();
        for (let i = 1; i <= pageCount; i++) {
          doc.setPage(i);
          const pageHeight = doc.internal.pageSize.getHeight();
          doc.setFontSize(8);
          doc.setTextColor(150);
          doc.text(`Página ${i} de ${pageCount}`, pageWidth / 2, pageHeight - 10, { align: 'center' });
        }
      };
      
      // 6. GERAÇÃO DA TABELA E CONTEÚDO DAS PÁGINAS
      autoTable(doc, {
        startY: 50,         // Posição inicial na PRIMEIRA página (deixa espaço para header e cards)
        margin: { top: 20 },  // Margem superior para as DEMAIS páginas (sem header)
        head: head,
        body: body,
        theme: 'grid',
        headStyles: {
          fillColor: [240, 240, 240],
          textColor: [30, 30, 30],
          fontStyle: 'bold',
        },
        styles: { fontSize: 8, cellPadding: 2 },
        columnStyles: { 9: { cellWidth: 50 } }, // Coluna "Observação"
        didParseCell: function(data) {
          // Colore o texto da célula de Status
          if (data.column.index === 4) { 
            if (data.cell.raw === 'Concluída') {
              data.cell.styles.textColor = '#10B981';
              data.cell.styles.fontStyle = 'bold';
            }
            if (data.cell.raw === 'Pendente') { data.cell.styles.textColor = '#F87171'; }
            if (data.cell.raw === 'Em andamento') { data.cell.styles.textColor = '#FBBF24'; }
          }
        },
        // Hook executado para cada página que a tabela cria
        didDrawPage: (data) => {
          // Desenha o cabeçalho e os cards APENAS na primeira página
          if (data.pageNumber === 1) {
            // --- INÍCIO: CABEÇALHO DA PÁGINA 1 ---
            // Substitua os valores de 'logoOriginalWidth/Height' pelos da sua imagem para a proporção ideal
            const logoOriginalWidth = 150;
            const logoOriginalHeight = 40; 
            const logoWidth = 25;
            const logoHeight = logoWidth * (logoOriginalHeight / logoOriginalWidth);
            doc.addImage(logoBase64, 'PNG', margin, 10, logoWidth, logoHeight);
  
            doc.setFontSize(18);
            doc.setFont("helvetica", "bold");
            doc.text("Relatório de Status de Serviços", pageWidth / 2, 18, { align: 'center' });
  
            doc.setFontSize(10);
            doc.setFont("helvetica", "normal");
            doc.text(`Data de Extração: ${format(new Date(), "dd/MM/yyyy HH:mm")}`, pageWidth - margin, 12, { align: 'right' });
            doc.text(`Filtro Ativo: ${generateDynamicFilename(table).replace('relatorio_servicos_', '').replace(/_\d{4}-\d{2}-\d{2}/, '') || 'Nenhum'}`, pageWidth - margin, 18, { align: 'right' });
            
            doc.setDrawColor(200);
            doc.line(margin, 25, pageWidth - margin, 25);
            // --- FIM: CABEÇALHO ---
  
            // --- INÍCIO: CARDS DE MÉTRICAS DA PÁGINA 1 ---
            const cardY = 32;
            const cardWidth = 50;
            const cardHeight = 12;
            const cardRadius = 2;
            const cardTextColor: [number, number, number] = [30, 30, 30];
            const cardFillColor: [number, number, number] = [220, 220, 220];
  
            // Card 1: Total
            doc.setFillColor(...cardFillColor);
            doc.roundedRect(margin, cardY, cardWidth, cardHeight, cardRadius, cardRadius, 'F');
            doc.setTextColor(...cardTextColor);
            doc.setFontSize(9);
            doc.setFont("helvetica", "normal");
            doc.text('Total de Serviços', margin + 5, cardY + 5);
            doc.setFontSize(12);
            doc.setFont("helvetica", "bold");
            doc.text(totalRecords.toString(), margin + 5, cardY + 10);
            
            // Card 2: Concluídos
            const card2X = margin + cardWidth + 5;
            doc.setFillColor(...cardFillColor);
            doc.roundedRect(card2X, cardY, cardWidth, cardHeight, cardRadius, cardRadius, 'F');
            doc.setTextColor(...cardTextColor);
            doc.setFontSize(9);
            doc.setFont("helvetica", "normal");
            doc.text('Concluídos', card2X + 5, cardY + 5);
            doc.setFontSize(12);
            doc.setFont("helvetica", "bold");
            doc.setTextColor('#10B981');
            doc.text(completed.toString(), card2X + 5, cardY + 10);
  
            // Card 3: Pendentes / Em Andamento
            const card3X = margin + (cardWidth * 2) + 10;
            doc.setFillColor(...cardFillColor);
            doc.roundedRect(card3X, cardY, cardWidth, cardHeight, cardRadius, cardRadius, 'F');
            doc.setTextColor(...cardTextColor);
            doc.setFontSize(9);
            doc.setFont("helvetica", "normal");
            doc.text('Pendentes / Em Andamento', card3X + 5, cardY + 5);
            doc.setFontSize(12);
            doc.setFont("helvetica", "bold");
            doc.setTextColor('#F87171');
            doc.text(`${pending} / ${inProgress}`, card3X + 5, cardY + 10);
            // --- FIM: CARDS DE MÉTRICAS ---
          }
        },
      });
  
      // 7. ADICIONA O RODAPÉ EM TODAS AS PÁGINAS
      addPageNumbers(doc);
  
      // 8. SALVA O ARQUIVO PDF
      const fileName = `${generateDynamicFilename(table)}.pdf`;
      doc.save(fileName);
  
      toast.success("Relatório PDF gerado com sucesso!");
    } catch (error) {
      toast.error("Falha ao gerar o relatório PDF.");
      console.error("Erro no PDF:", error);
    }
  };
   
  return (
    <div className="h-full bg-[#111113] text-gray-200 flex flex-col border border-blue-500/30 rounded-2xl">
      {/* HEADER COM FILTROS - FIXO */}
      <div className="flex-none p-6 border-b border-gray-800 space-y-4 bg-gradient-to-r from-blue-600/10 to-blue-700/5">
        {/* Barra Principal de Filtros */}
        <div className="flex items-center gap-3">
          {/* Busca Global */}
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Buscar máquinas, aplicações ou serviços..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                // Aplicar busca global
                table.setGlobalFilter(e.target.value);
              }}
              className="pl-10 bg-[#1A1A1E] border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Filtros Rápidos */}
          <FilterDropdown
            label="Máquina"
            value={table.getColumn('machineName')?.getFilterValue() as string ?? ""}
            options={uniqueMachines}
            onChange={(value) => table.getColumn('machineName')?.setFilterValue(value === "" ? undefined : value)}
            placeholder="Máquina"
          />

          <FilterDropdown
            label="Status"
            value={table.getColumn('status')?.getFilterValue() as string ?? ""}
            options={statusOptions}
            onChange={(value) => table.getColumn('status')?.setFilterValue(value === "" ? undefined : value)}
            placeholder="Status"
          />

          <FilterDropdown
            label="Tipo"
            value={table.getColumn('applicationType')?.getFilterValue() as string ?? ""}
            options={uniqueTypes}
            onChange={(value) => table.getColumn('applicationType')?.setFilterValue(value === "" ? undefined : value)}
            placeholder="Tipo"
          />

          <FilterDropdown
            label="Responsável"
            value={table.getColumn('responsible')?.getFilterValue() as string ?? ""}
            options={uniqueResponsibles}
            onChange={(value) => table.getColumn('responsible')?.setFilterValue(value === "" ? undefined : value)}
            placeholder="Responsável"
          
          />

          {/* Botão Filtros Avançados */}
          <Button
            variant="outline"
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            className="bg-[#1A1A1E] border-gray-700 hover:bg-[#202024] cursor-pointer hover:text-gray-100"
          >
            <Filter className="mr-2 h-4 w-4" />
            Filtros
          </Button>

          {/* Controle de Colunas */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="bg-[#1A1A1E] border-gray-700 hover:bg-[#202024] cursor-pointer hover:text-gray-100">
                <Columns className="mr-2 h-4 w-4" />
                Colunas
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-[#1A1A1D] border-gray-700 text-gray-200 z-50 ">
              {table.getAllColumns()
                .filter((column) => column.getCanHide() && column.id !== 'statusIcon' && column.id !== 'actions')
                .map((column) => (
                  <DropdownMenuCheckboxItem
                  className="hover:!bg-gray-700/50 hover:!text-gray-100 cursor-pointer"
                    key={column.id}
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) => column.toggleVisibility(!!value)}
                  >
                    {column.columnDef.header as string}
                  </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Botões de Exportação */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700 cursor-pointer">
                <Download className="mr-2 h-4 w-4" />
                Exportar
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-[#1A1A1D] border-gray-700 z-50 p-2">
              <Button
                variant="ghost"
                onClick={exportToExcel}
                className="w-full justify-start text-gray-200 hover:bg-gray-700/50 hover:text-gray-100 cursor-pointer"
              >
                <FileSpreadsheet className="mr-2 h-4 w-4 text-green-500" />
                Excel (.xlsx)
              </Button>
              <Button
                variant="ghost"
                onClick={exportToPdf}
                className="w-full justify-start text-gray-200 hover:bg-gray-700/50 hover:text-gray-100 cursor-pointer"
              >
                <FileText className="mr-2 h-4 w-4 text-red-500" />
                PDF (.pdf)
              </Button>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Filtros Avançados (Expansível) */}
        {showAdvancedFilters && (
          <div className="p-4 bg-[#1A1A1E] border border-gray-700 rounded-lg">
            <div className="grid grid-cols-4 gap-4">
              <div>
                <label className="block text-xs text-gray-400 mb-1">Data de Entrega (De)</label>
                <Input type="date" className="bg-[#0F0F11] border-gray-700" />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">Data de Entrega (Até)</label>
                <Input type="date" className="bg-[#0F0F11] border-gray-700" />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">Item Obrigatório</label>
                <FilterDropdown
                  label="Obrigatório"
                  value={table.getColumn('itemObrigatorio')?.getFilterValue() as string ?? ""}
                  options={["Sim", "Não"]}
                  onChange={(value) => table.getColumn('itemObrigatorio')?.setFilterValue(value === "" ? undefined : value)}
                  placeholder="Todos"
                />
              </div>
              <div className="flex items-end gap-2">
                <Button 
                  onClick={() => {
                    table.resetColumnFilters();
                    setSearchTerm("");
                    table.setGlobalFilter("");
                  }}
                  variant="outline"
                  className="bg-gray-700 border-gray-600 hover:bg-gray-600"
                >
                  Limpar Filtros
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

     {/* TABELA COM SCROLL INTERNO */}
      <div className="flex-1 overflow-hidden">
        {/* esse div controla tanto X quanto Y */}
        <div className="h-full w-full overflow-x-auto overflow-y-auto table-scrollbar">
          <Table className="min-w-full">
            <TableHeader className="sticky top-0 bg-[#0F0F11] z-10">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} className="border-b border-gray-800 hover:bg-transparent">
                  {headerGroup.headers.map((header) => (
                    <TableHead 
                      key={header.id} 
                      className="text-xs font-medium text-gray-400 uppercase tracking-wider py-4 px-6"
                    >
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    className={`
                      border-b border-gray-800 hover:bg-gray-800/30 transition-colors group
                    `}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell 
                        key={cell.id} 
                        className="px-6 py-3 text-sm text-gray-300"
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center text-gray-500">
                    Nenhum resultado encontrado.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* FOOTER COM PAGINAÇÃO - FIXO */}
      <div className="flex-none px-6 py-4 border-t rounded-b-2xl border-gray-800 bg-[#0F0F11]">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-400">
            Mostrando {table.getRowModel().rows.length} de {table.getFilteredRowModel().rows.length} registros
            {table.getFilteredRowModel().rows.length !== initialData.length && 
              ` (${initialData.length} total)`
            }
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="border-gray-800 bg-[#0F0F11] hover:bg-[#1A1A1E] font-normal disabled:opacity-50 cursor-pointer hover:text-gray-100"
            >
              Anterior
            </Button>
            
            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(5, table.getPageCount()) }, (_, i) => {
                const pageIndex = table.getState().pagination.pageIndex;
                const isCurrentPage = i === pageIndex;
                
                return (
                  <Button
                    key={i}
                    variant={isCurrentPage ? "default" : "outline"}
                    size="sm"
                    onClick={() => table.setPageIndex(i)}
                    className={isCurrentPage 
                      ? "bg-blue-600 text-white cursor-pointer hover:bg-blue-700" 
                      : "bg-[#0F0F11] border-gray-800 hover:bg-[#1A1A1E] cursor-pointer hover:text-gray-100"
                    }
                  >
                    {i + 1}
                  </Button>
                );
              })}
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="border-gray-800 bg-[#0F0F11] hover:bg-[#1A1A1E] font-normal disabled:opacity-50 cursor-pointer hover:text-gray-100"
            >
              Próximo
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}