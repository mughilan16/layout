"use client"
import { Autocomplete, Box, TextField } from "@mui/material";
import { useClients } from "@/queries/useClients";
import { useState } from "react";
import { Client } from "@/api/clients";

export default function Private() {
  const { data: clients, isLoading } = useClients();
  const [client, setClient] = useState<Client>();
  return (
    <Box sx={{ padding: "10px", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
      <Box sx={{ width: "500px" }}>
        <Autocomplete
          loading={isLoading}
          options={clients !== undefined ? clients : []}
          value={client ? client : undefined}
          defaultValue={undefined}
          onChange={(_, value) => setClient(value!)}
          renderInput={(params) =>
            <TextField {...params} label="Client" />
          }
          renderOption={(props, option) => {
            const { key, ...optionProps } = props;
            return (
              <Box
                key={key}
                component="li"
                sx={{display: "flex", alignItems: "center", gap: "6px"}}
                {...optionProps}
              >
                <img
                  loading="lazy"
                  width="20"
                  src={`/client-icon/favicon/` + option.favicon}
                  alt=""
                />
                {option.comp_name}
              </Box>
            )
          }}
          getOptionKey={option => option.comp_id}
          getOptionLabel={option => option.comp_name}
        >
        </Autocomplete>
      </Box>
    </Box>
  );
}

