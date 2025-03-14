export const projectSchema = {
    name: value => (!value?.trim() ? 'Nome do projeto é obrigatório' : null),
    startDate: value => (!value ? 'Data de início é obrigatória' : null),
    endDate: (value, values) => {
        if (!value) return 'Data de término é obrigatória';
        return new Date(value) < new Date(values.startDate)
          ? 'Data final deve ser após a data inicial'
          : null;
      }
  };
