"use client"
import { Autocomplete, Box, Button, TextField } from "@mui/material";
import { useClients } from "@/queries/useClients";
import { useState } from "react";
import { Client } from "@/api/clients";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content"
import { createRoot } from "react-dom/client";

const MySwal = withReactContent(Swal);

export default function Private() {
  const { data: clients, isLoading } = useClients();
  const [client, setClient] = useState<Client>();
  const example = () => {
    MySwal.fire({
      title: "Example",
      html: <Box>Hello</Box>,
      didOpen() {
        MySwal.showLoading();
      },
      showCloseButton: false,
    })
  }
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
                sx={{ display: "flex", py: "4px", pr: "5px", alignItems: "center", gap: "5px", borderBottom: "1px solid #aaa" }}
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
        <Button onClick={example}>Example Button</Button>
      </Box>
    </Box>
  );
}

