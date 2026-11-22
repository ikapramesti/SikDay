import React, { createContext, useContext, useState, useMemo } from "react";
import initialTransactions from "../data/initialTransactions";

const TransactionContext = createContext();

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  })
    .format(amount)
    .replace("Rp", "IDR ");
};

const initialUserProfile = {
  name: "Tiana Safira",
  email: "tiana.safira@student.ac.id",
  phone: "0812-3456-7890",
  occupation: "Mahasiswa / UI/UX Designer",
  avatarInitials: "TS",
};

const deriveInitials = (name) => {
  if (!name) return "U";
  const parts = name.trim().split(" ").filter(Boolean);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

export const TransactionProvider = ({ children }) => {
  const [transactions, setTransactions] = useState(initialTransactions);
  const [userProfile, setUserProfile] = useState(initialUserProfile);

  const [readNotificationIds, setReadNotificationIds] = useState({});
  const [dismissedNotificationIds, setDismissedNotificationIds] = useState([]);

  const addTransaction = (newTxData) => {
    const newTx = {
      ...newTxData,
      id: `tx-${Date.now()}`,
    };
    setTransactions((prev) => [newTx, ...prev]);
  };

  const editTransaction = (id, updatedData) => {
    setTransactions((prev) =>
      prev.map((item) => (item.id === id ? { ...updatedData, id } : item)),
    );
  };

  const deleteTransaction = (id) => {
    setTransactions((prev) => prev.filter((item) => item.id !== id));
  };

  const resetTransactions = () => {
    setTransactions(initialTransactions);
    setReadNotificationIds({});
    setDismissedNotificationIds([]);
  };

  const getTransactionById = (id) => {
    return transactions.find((item) => item.id === id);
  };

  const totalIncome = useMemo(() => {
    return transactions
      .filter((tx) => tx.type === "income")
      .reduce((sum, tx) => sum + Number(tx.amount || 0), 0);
  }, [transactions]);

  const totalExpense = useMemo(() => {
    return transactions
      .filter((tx) => tx.type === "expense")
      .reduce((sum, tx) => sum + Number(tx.amount || 0), 0);
  }, [transactions]);

  const balance = useMemo(() => {
    return totalIncome - totalExpense;
  }, [totalIncome, totalExpense]);

  const categoryRecap = useMemo(() => {
    const map = {};
    transactions.forEach((tx) => {
      map[tx.category] = (map[tx.category] || 0) + Number(tx.amount || 0);
    });
    return map;
  }, [transactions]);

  const getCategoryTotal = (categoryName) => {
    return categoryRecap[categoryName] || 0;
  };

  const categoryStats = useMemo(() => {
    const map = new Map();
    transactions
      .filter((tx) => tx.type === "expense")
      .forEach((tx) => {
        const current = map.get(tx.category) || { total: 0, count: 0 };
        map.set(tx.category, {
          total: current.total + Number(tx.amount || 0),
          count: current.count + 1,
        });
      });

    return Array.from(map.entries())
      .map(([category, data]) => ({
        category,
        total: data.total,
        percentage:
          totalExpense > 0 ? Math.round((data.total / totalExpense) * 100) : 0,
        count: data.count,
        type: "expense",
      }))
      .sort((a, b) => b.total - a.total);
  }, [transactions, totalExpense]);

  const incomeCategoryStats = useMemo(() => {
    const map = new Map();
    transactions
      .filter((tx) => tx.type === "income")
      .forEach((tx) => {
        const current = map.get(tx.category) || { total: 0, count: 0 };
        map.set(tx.category, {
          total: current.total + Number(tx.amount || 0),
          count: current.count + 1,
        });
      });

    return Array.from(map.entries())
      .map(([category, data]) => ({
        category,
        total: data.total,
        percentage:
          totalIncome > 0 ? Math.round((data.total / totalIncome) * 100) : 0,
        count: data.count,
        type: "income",
      }))
      .sort((a, b) => b.total - a.total);
  }, [transactions, totalIncome]);

  const generatedNotifications = useMemo(() => {
    const notifs = [];

    if (balance <= 0) {
      notifs.push({
        id: "notif-deficit",
        type: "danger",
        title: "⚠️ Peringatan: Saldo Habis / Minus!",
        message: `Saldo total Anda saat ini ${formatCurrency(
          balance,
        )} (Defisit). Total pengeluaran melebihi pemasukan. Segera hentikan pengeluaran yang tidak mendesak!`,
        date: "Hari ini",
        priority: 1,
      });
    }

    if (balance > 0 && balance < 2000000) {
      notifs.push({
        id: "notif-low-balance",
        type: "warning",
        title: "⚠️ Peringatan: Saldo Sudah Menipis!",
        message: `Saldo Anda tersisa ${formatCurrency(
          balance,
        )}. Ambang batas aman adalah Rp 2.000.000. Waspadai pengeluaran konsumtif hingga periode gajian berikutnya.`,
        date: "Hari ini",
        priority: 2,
      });
    }

    const expenseRatio =
      totalIncome > 0 ? (totalExpense / totalIncome) * 100 : 100;
    if (totalExpense > 0 && expenseRatio >= 75 && balance > 0) {
      notifs.push({
        id: "notif-high-expense-ratio",
        type: "warning",
        title: "📊 Rasio Pengeluaran Tinggi",
        message: `Pengeluaran Anda telah mencapai ${Math.round(
          expenseRatio,
        )}% dari total pemasukan. Pertahankan cadangan kas untuk kebutuhan pokok.`,
        date: "Kemarin",
        priority: 3,
      });
    }

    const emergencyTotal = getCategoryTotal("Tabungan Darurat");
    if (emergencyTotal > 0) {
      notifs.push({
        id: "notif-emergency-fund",
        type: "info",
        title: "🛡️ Pos Tabungan Darurat Aktif",
        message: `Alokasi Tabungan Darurat Anda saat ini sebesar ${formatCurrency(
          emergencyTotal,
        )}. Tetap konsisten menyisihkan dana untuk proteksi masa depan.`,
        date: "3 hari lalu",
        priority: 4,
      });
    }

    notifs.push({
      id: "notif-financial-tip",
      type: "success",
      title: "💡 Tips Finansial SikDay",
      message:
        "Terapkan formula 50/30/20: 50% kebutuhan pokok, 30% keinginan pribadi, dan 20% tabungan atau investasi rutin.",
      date: "Minggu ini",
      priority: 5,
    });

    return notifs;
  }, [balance, totalIncome, totalExpense, categoryRecap]);

  const notifications = useMemo(() => {
    return generatedNotifications
      .filter((n) => !dismissedNotificationIds.includes(n.id))
      .map((n) => ({
        ...n,
        isRead: Boolean(readNotificationIds[n.id]),
      }));
  }, [generatedNotifications, readNotificationIds, dismissedNotificationIds]);

  const unreadCount = useMemo(() => {
    return notifications.filter((n) => !n.isRead).length;
  }, [notifications]);

  const markNotificationAsRead = (id) => {
    setReadNotificationIds((prev) => ({ ...prev, [id]: true }));
  };

  const markAllNotificationsAsRead = () => {
    const updated = { ...readNotificationIds };
    notifications.forEach((n) => {
      updated[n.id] = true;
    });
    setReadNotificationIds(updated);
  };

  const deleteNotification = (id) => {
    setDismissedNotificationIds((prev) => [...prev, id]);
  };

  const clearAllNotifications = () => {
    const allIds = generatedNotifications.map((n) => n.id);
    setDismissedNotificationIds(allIds);
  };

  const updateUserProfile = (newData) => {
    setUserProfile((prev) => {
      const updatedName = newData.name?.trim() || prev.name;
      return {
        ...prev,
        ...newData,
        name: updatedName,
        avatarInitials: deriveInitials(updatedName),
      };
    });
  };

  return (
    <TransactionContext.Provider
      value={{
        // Transaksi
        transactions,
        addTransaction,
        editTransaction,
        deleteTransaction,
        resetTransactions,
        getTransactionById,
        totalIncome,
        totalExpense,
        balance,
        totalBalance: balance,
        categoryRecap,
        categoryStats,
        incomeCategoryStats,
        getCategoryTotal,
        formatCurrency,

        notifications,
        unreadCount,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        deleteNotification,
        clearAllNotifications,

        userProfile,
        updateUserProfile,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransactions = () => {
  const context = useContext(TransactionContext);
  if (!context) {
    throw new Error(
      "useTransactions harus digunakan di dalam TransactionProvider",
    );
  }
  return context;
};

export default TransactionContext;
