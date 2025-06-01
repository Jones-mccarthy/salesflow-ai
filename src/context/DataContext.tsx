import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

// Define types
export interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
  category: string;
  createdAt: string;
}

export interface Sale {
  id: string;
  productId: string;
  quantity: number;
  amount: number;
  date: string;
  createdAt: string;
}

export interface Creditor {
  id: string;
  name: string;
  amount: number;
  dueDate: string;
}

export interface Debtor {
  id: string;
  name: string;
  amount: number;
  dueDate: string;
}

export interface Debts {
  creditors: Creditor[];
  debtors: Debtor[];
}

interface DataContextType {
  products: Product[];
  sales: Sale[];
  debts: Debts;
  addProduct: (product: Omit<Product, 'id' | 'createdAt'>) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  addSale: (sale: Omit<Sale, 'id' | 'createdAt'>) => void;
  addCreditor: (creditor: Omit<Creditor, 'id'>) => void;
  addDebtor: (debtor: Omit<Debtor, 'id'>) => void;
  deleteCreditor: (id: string) => void;
  deleteDebtor: (id: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider = ({ children }: { children: ReactNode }): React.ReactElement => {
  const [products, setProducts] = useState<Product[]>([]);
  const [sales, setSales] = useState<Sale[]>([]);
  const [debts, setDebts] = useState<Debts>({
    creditors: [],
    debtors: []
  });

  const addProduct = (product: Omit<Product, 'id' | 'createdAt'>) => {
    const newProduct: Product = {
      ...product,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    setProducts(prev => [...prev, newProduct]);
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts(prev => 
      prev.map(product => 
        product.id === id ? { ...product, ...updates } : product
      )
    );
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(product => product.id !== id));
  };

  const addSale = (sale: Omit<Sale, 'id' | 'createdAt'>) => {
    const newSale: Sale = {
      ...sale,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    setSales(prev => [...prev, newSale]);
    
    // Update product quantity
    const product = products.find(p => p.id === sale.productId);
    if (product) {
      updateProduct(product.id, {
        quantity: product.quantity - sale.quantity
      });
    }
  };

  const addCreditor = (creditor: Omit<Creditor, 'id'>) => {
    const newCreditor: Creditor = {
      ...creditor,
      id: Date.now().toString()
    };
    setDebts(prev => ({
      ...prev,
      creditors: [...prev.creditors, newCreditor]
    }));
  };

  const addDebtor = (debtor: Omit<Debtor, 'id'>) => {
    const newDebtor: Debtor = {
      ...debtor,
      id: Date.now().toString()
    };
    setDebts(prev => ({
      ...prev,
      debtors: [...prev.debtors, newDebtor]
    }));
  };

  const deleteCreditor = (id: string) => {
    setDebts(prev => ({
      ...prev,
      creditors: prev.creditors.filter(creditor => creditor.id !== id)
    }));
  };

  const deleteDebtor = (id: string) => {
    setDebts(prev => ({
      ...prev,
      debtors: prev.debtors.filter(debtor => debtor.id !== id)
    }));
  };

  return (
    <DataContext.Provider value={{
      products,
      sales,
      debts,
      addProduct,
      updateProduct,
      deleteProduct,
      addSale,
      addCreditor,
      addDebtor,
      deleteCreditor,
      deleteDebtor
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};