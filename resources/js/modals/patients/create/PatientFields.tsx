import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
    SelectTrigger,
    Select,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import { OptionalLabel } from "@/components/form/optional-label";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";

export function PatientFields({ form }: any) {
    return (
        <>
            <FormField
                control={form.control}
                name="dni"
                render={({ field, fieldState }) => (
                    <FormItem>
                        <FormLabel>DNI</FormLabel>
                        <FormControl>
                            <Input
                                autoComplete="off"
                                placeholder="10645048"
                                {...field}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="names"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Nombre</FormLabel>
                        <FormControl>
                            <Input
                                autoComplete="off"
                                placeholder="Ricardo"
                                {...field}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="lastname"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Apellido</FormLabel>
                        <FormControl>
                            <Input
                                autoComplete="off"
                                placeholder="Arjona"
                                {...field}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="date_of_birth"
                render={({ field }) => (
                    <FormItem className="flex flex-col">
                        <FormLabel>Date of birth</FormLabel>
                        <Popover>
                            <PopoverTrigger asChild>
                                <FormControl>
                                    <Button
                                        variant={"outline"}
                                        className={cn(
                                            "w-full pl-3 text-left font-normal",
                                            !field.value &&
                                                "text-muted-foreground",
                                        )}
                                    >
                                        {field.value ? (
                                            format(field.value, "PPP")
                                        ) : (
                                            <span>Pick a date</span>
                                        )}
                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                    </Button>
                                </FormControl>
                            </PopoverTrigger>
                            <PopoverContent
                                className="w-auto p-0"
                                align="start"
                            >
                                <Calendar
                                    daysWithEvents={[]}
                                    mode="single"
                                    selected={field.value}
                                    onSelect={field.onChange}
                                    disabled={(date) => date > new Date()}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="sex"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Sexo</FormLabel>

                        <FormControl>
                            <RadioGroup
                                id="sex"
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="flex space-y-1"
                            >
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl>
                                        <RadioGroupItem value="F" />
                                    </FormControl>
                                    <FormLabel className="font-normal">
                                        Femenino
                                    </FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl>
                                        <RadioGroupItem value="M" />
                                    </FormControl>
                                    <FormLabel className="font-normal">
                                        Masculino
                                    </FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl>
                                        <RadioGroupItem value="U" />
                                    </FormControl>
                                    <FormLabel className="font-normal">
                                        Otro
                                    </FormLabel>
                                </FormItem>
                            </RadioGroup>
                        </FormControl>
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="healthcare"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>
                            Obra social <OptionalLabel />
                        </FormLabel>
                        <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                        >
                            <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a verified email to display" />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                <SelectItem value="other">Otra</SelectItem>
                                {insurances
                                    .toSorted((a, b) =>
                                        a.label < b.label ? -1 : 1,
                                    )
                                    .map(({ value, label, logo }) => (
                                        <SelectItem value={value} key={value}>
                                            <div className="flex gap-2 items-center">
                                                {label}
                                                <img
                                                    src={logo}
                                                    className="h-3"
                                                />
                                            </div>
                                        </SelectItem>
                                    ))}
                            </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </>
    );
}

const insurances = [
    {
        value: "OSDE",
        logo: "https://7694067.fs1.hubspotusercontent-na1.net/hubfs/7694067/Osde-logo%20ok.png",
        label: "OSDE",
    },
    {
        value: "Boreal  Salud",
        logo: "https://www.borealsalud.com.ar/assets/images/brands/02.png",
        label: "Boreal  Salud",
    },
    {
        value: "Medifé",
        logo: "https://medife.com.ar/themes/custom/medifetema/images/logo-mobile.svg",
        label: "Medifé",
    },
    {
        value: "OSCEARA",
        logo: "https://osceara.com.ar/wp-content/uploads/2021/09/logo.png",
        label: "OSCEARA",
    },
    {
        value: "OSPAT",
        logo: "https://7694067.fs1.hubspotusercontent-na1.net/hubfs/7694067/Osde-logo%20ok.png",
        label: "OSPAT",
    },
    {
        value: "Sancor Salud",
        logo: "https://repo.sancorsalud.com.ar/webinstitucional/assets/images/logo_web_50.webp",
        label: "Sancor Salud",
    },
    {
        value: "OSBA",
        logo: "https://7694067.fs1.hubspotusercontent-na1.net/hubfs/7694067/Osde-logo%20ok.png",
        label: "OSBA",
    },
    {
        value: "Ostel Soeestilar",
        logo: "https://7694067.fs1.hubspotusercontent-na1.net/hubfs/7694067/Osde-logo%20ok.png",
        label: "Ostel Soeestilar",
    },
    {
        value: "Ospsip Upsra",
        logo: "https://7694067.fs1.hubspotusercontent-na1.net/hubfs/7694067/Osde-logo%20ok.png",
        label: "Ospsip Upsra",
    },
    {
        value: "Obra social de docentes particulares",
        logo: "https://7694067.fs1.hubspotusercontent-na1.net/hubfs/7694067/Osde-logo%20ok.png",
        label: "Obra social de docentes particulares",
    },
    {
        value: "DIPFA",
        logo: "https://7694067.fs1.hubspotusercontent-na1.net/hubfs/7694067/Osde-logo%20ok.png",
        label: "DIPFA",
    },
    {
        value: "APOS",
        logo: "http://aposlr.gob.ar/wp-content/uploads_2/2023/04/APOS_logo.png",
        label: "APOS",
    },
    {
        value: "OSUNLAR",
        logo: "https://osunlar.org/img/logo-footer.png",
        label: "OSUNLAR",
    },
];
