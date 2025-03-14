export const activitySchema = {
    projectId: (value) => !value && 'Selecione um projeto',
    name: (value) => !value?.trim() && 'Nome é obrigatório',
    startDate: (value) => !value && 'Data de início é obrigatória',
    endDate: (value, values) => {
      if (!value) return 'Data de término é obrigatória';
      return new Date(value) < new Date(values.startDate)
        ? 'Data final deve ser após a data inicial'
        : null;
    }
  };
