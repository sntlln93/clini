import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { OptionalLabel } from "@/components/form/optional-label";

export function AddressFields({ form }: any) {
    return (
        <>
            <FormField
                control={form.control}
                name="address_line"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>
                            Dirección <OptionalLabel />
                        </FormLabel>
                        <FormControl>
                            <Input
                                placeholder="Calle 1241, Centro"
                                {...field}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>
                            Localidad <OptionalLabel />
                        </FormLabel>
                        <FormControl>
                            <Input placeholder="Sanagasta" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            {/* TODO? Add state and countr?*/}
        </>
    );
}
