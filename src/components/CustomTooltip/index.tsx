import { format, parseISO } from "date-fns"
import { ptBR } from "date-fns/locale"

interface TooltipProps {
  active?: boolean
  payload?: any
  label?: string
}

export function CustomTooltip({ active, payload, label }: TooltipProps) {
  if (active) {
    return (
      <div className="rounded text-zinc-200 p-2 shadow-xl text-center bg-orange-500">
        {
          label && <h4 className="mb-3 text-zinc-200">{format(parseISO(label), "EEEE', 'd' de 'MMMM", { locale: ptBR })}</h4>
        }
        <span className="text-xl">$
          <span className="text-3xl mx-1 font-bold">
            {payload[0].value.toFixed(2)}
          </span>
          USD
        </span>
      </div>
    )
  }
  return null
}