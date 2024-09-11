import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: [{
            id: undefined,
            cpf_cnpj: "",
            nome_produtor: "",
            nome_fazenda: "",
            cidade: "",
            estado: "",
            area_total_hectares_fazenda: "",
            area_agricultavel_hectares: "",
            area_vegetacao_hectares: "",
            culturas_plantadas: ""
        }]
    },
    reducers: {
        createUser(state, { payload }) {
            return { ...state, user: payload }
        },
        changeUser(state, { payload }) {
            return { ...state, user: payload }
        }
    }
});

export const { createUser, changeUser } = userSlice.actions;
export const selectUser = state => state.user;
export default userSlice.reducer;