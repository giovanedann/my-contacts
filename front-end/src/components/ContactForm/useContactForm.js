import { useEffect, useImperativeHandle, useState } from 'react';

import useSafeAsyncState from '../../hooks/useSafeAsyncState';
import useErrors from '../../hooks/useErrors';

import formatPhone from '../../utils/formatPhone';
import isEmailValid from '../../utils/isEmailValid';

import CategoriesService from '../../services/CategoriesService';

export function useContactForm({ onSubmit, ref }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useSafeAsyncState([]);
  const [isLoadingCategories, setIsLoadingCategories] = useSafeAsyncState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    errors, setError, removeError, getErrorMessageByFieldName,
  } = useErrors();

  const isFormValid = (name && !errors.length);

  useImperativeHandle(ref, () => ({
    setFieldsValues: (contact) => {
      setName(contact.name ?? '');
      setEmail(contact.email ?? '');
      setPhone(formatPhone(contact.phone ?? ''));
      setCategoryId(contact.category.id ?? '');
    },
    resetFields: () => {
      setName('');
      setCategoryId('');
      setPhone('');
      setEmail('');
    },
  }), []);

  useEffect(() => {
    const controller = new AbortController();

    async function loadCategories() {
      try {
        setIsLoadingCategories(true);
        const categoriesList = await CategoriesService.listCategories(controller.signal);
        setCategories(categoriesList);
      } catch { } finally {
        setIsLoadingCategories(false);
      }
    }

    loadCategories();

    return () => {
      controller.abort();
    };
  }, [setCategories, setIsLoadingCategories]);

  function handleNameChange({ target }) {
    setName(target.value);

    if (!target.value) {
      return setError({ field: 'name', message: 'Name is required.' });
    }

    return removeError('name');
  }

  function handleEmailChange({ target }) {
    setEmail(target.value);

    if (target.value && !isEmailValid(target.value)) {
      setError({ field: 'email', message: 'Invalid e-mail' });
    } else {
      removeError('email');
    }
  }

  function handlePhoneChange({ target }) {
    setPhone(formatPhone(target.value));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setIsSubmitting(true);

    await onSubmit({
      name, email, phone, categoryId,
    });

    setIsSubmitting(false);
  }

  return {
    handleSubmit,
    getErrorMessageByFieldName,
    handleNameChange,
    handleEmailChange,
    handlePhoneChange,
    setCategoryId,
    name,
    isSubmitting,
    email,
    phone,
    isLoadingCategories,
    categoryId,
    categories,
    isFormValid,
  };
}
