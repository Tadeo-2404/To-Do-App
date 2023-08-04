"use client"
import React, { useEffect, useState } from 'react';
import Todos from "../components/Todos";
import { FormNewTask } from '../components/FormNewTask';
import axios from 'axios';
import { CustomButton } from '../components/custom/CustomButton';
import { Grid, useMediaQuery, useTheme } from '@mui/material';

interface categories {
  category: string
}

interface ContextValue {
  render: number;
}

export default function Home() {
  const [types, setTypes] = useState<categories[]>([]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/rawQuery');
        const result = response.data;
        setTypes(result);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <Grid container direction="column" justifyContent="center" alignItems="center">
      <Grid container justifyContent={isMobile ? "center" : "space-between"} alignItems="center" direction="row" rowGap={"20px"}>
        <Grid item textAlign={"center"}>
          <h1>Bienvenido, aqui puedes visualizar tus tareas, para agregar una da click en nuevo</h1>
          <FormNewTask />
        </Grid>
        <Grid className='categories_container' item padding={2} justifyContent="center" alignItems="center">
          <Grid item textTransform={"capitalize"}>
            <h1>tus categorias</h1>
          </Grid>
          <Grid container wrap="wrap" columnGap={2} justifyContent="center" alignItems="center">
            {types.length > 0 ? (
              types.map((item) => (
                <Grid item key={item.category}>
                  <CustomButton href={`/categorias/${item.category}`} text={item.category} variant="contained" />
                </Grid>
              ))
            ) : (
              <Grid item>
                <div>sin items</div>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>

      <Grid container item xl={12} lg={12} justifyContent="center" rowGap={"20px"} marginTop={"30px"}>
        <Grid item xl={4} lg={4}>
          <Todos attribute="completed" value="false" title="Pendiente" limit={3} addBtn={true} />
        </Grid>
        <Grid item xl={4} lg={4}>
          <Todos attribute="completed" value="true" title="Completado" limit={3} addBtn={true} />
        </Grid>
        <Grid item xl={4} lg={4}>
          <Todos attribute="priority" value="true" title="Prioridad" limit={3} addBtn={true} />
        </Grid>
      </Grid>
    </Grid>

  );
}
