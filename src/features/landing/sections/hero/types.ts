export type Stat = {
  label: string;
  value: number;
  suffix?: string;
  color: string;
};


export interface CounterProps {
  from?: number
  to: number
  duration?: number
  suffix?: string,
  color:string
}
