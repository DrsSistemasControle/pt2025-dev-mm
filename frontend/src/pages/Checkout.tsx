import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { CardCheckout } from '../components/CardCheckout';
import { api } from '../services/api';
import styled from 'styled-components';

const schema = yup.object().shape({
  nomeTitular: yup.string().required('Nome do titular é obrigatório'),
  numeroCartao: yup.string().required('Número do cartão é obrigatório'),
  validade: yup.string().required('Validade é obrigatória'),
  cvv: yup.string().required('CVV é obrigatório'),
  cpf: yup.string().required('CPF é obrigatório'),
  dataNascimento: yup.string().required('Data de nascimento é obrigatória'),
  email: yup.string().email('E-mail inválido').required('E-mail é obrigatório')
});

const ResponseBox = styled.div`
  margin-top: 1rem;
  padding: 1rem;
  background-color: #e0ffe0;
  border: 1px solid #00aa00;
  border-radius: 4px;
  text-align: center;
`;

export const Checkout: React.FC = () => {
  const [resposta, setResposta] = useState<null | {
    status: number;
    message: string;
    data: {
      nomeTitular: string;
      bandeiraCartao: string;
      email: string;
    };
  }>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm({ resolver: yupResolver(schema), mode: 'onChange' });

  const onSubmit = async (data: any) => {
    try {
      const response = await api.post('/api/payments', data);
      setResposta(response.data); // <-- Armazena a resposta no estado
    } catch (err: any) {
      alert(err.response?.data?.message || 'Erro ao processar pagamento');
    }
  };

  return (
    <CardCheckout>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input label="Nome do Titular" {...register('nomeTitular')} error={errors.nomeTitular?.message} />
        <Input label="Número do Cartão" {...register('numeroCartao')} error={errors.numeroCartao?.message} />
        <Input label="Validade" {...register('validade')} error={errors.validade?.message} />
        <Input label="CVV" {...register('cvv')} error={errors.cvv?.message} />
        <Input label="CPF" {...register('cpf')} error={errors.cpf?.message} />
        <Input label="Data de Nascimento" {...register('dataNascimento')} error={errors.dataNascimento?.message} />
        <Input label="Email" {...register('email')} error={errors.email?.message} />
        <Button type="submit" disabled={!isValid}>Processar</Button>
      </form>

      {resposta && (
        <ResponseBox>
          <p><strong>Status:</strong> {resposta.status}</p>
          <p><strong>Mensagem:</strong> {resposta.message}</p>
          <p><strong>Nome:</strong> {resposta.data.nomeTitular}</p>
          <p><strong>Bandeira:</strong> {resposta.data.bandeiraCartao}</p>
          <p><strong>Email:</strong> {resposta.data.email}</p>
        </ResponseBox>
      )}
    </CardCheckout>
  );
};
