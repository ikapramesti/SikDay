import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Alert,
  Modal,
  TextInput,
} from "react-native";
import { Feather, MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import colors from "../constants/colors";
import Header from "../components/Header";
import { useTransactions } from "../context/TransactionContext";

export const ProfileScreen = ({ navigation }) => {
  const {
    balance,
    formatCurrency,
    transactions,
    resetTransactions,
    userProfile,
    updateUserProfile,
    unreadCount,
  } = useTransactions();

  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [nameInput, setNameInput] = useState(userProfile.name);
  const [emailInput, setEmailInput] = useState(userProfile.email);
  const [phoneInput, setPhoneInput] = useState(userProfile.phone);
  const [occupationInput, setOccupationInput] = useState(
    userProfile.occupation,
  );

  const handleOpenEditModal = () => {
    setNameInput(userProfile.name);
    setEmailInput(userProfile.email);
    setPhoneInput(userProfile.phone);
    setOccupationInput(userProfile.occupation);
    setIsEditModalVisible(true);
  };

  const handleSaveProfile = () => {
    if (!nameInput.trim()) {
      Alert.alert(
        "Validasi Gagal",
        "Nama lengkap pengguna tidak boleh kosong.",
      );
      return;
    }
    if (!emailInput.trim()) {
      Alert.alert("Validasi Gagal", "Alamat email tidak boleh kosong.");
      return;
    }

    updateUserProfile({
      name: nameInput.trim(),
      email: emailInput.trim(),
      phone: phoneInput.trim() || "-",
      occupation: occupationInput.trim() || "Pengguna SikDay",
    });

    setIsEditModalVisible(false);
    Alert.alert(
      "Profil Diperbarui",
      "Informasi profil Anda berhasil disimpan.",
    );
  };

  const handleResetData = () => {
    Alert.alert(
      "Reset Data Transaksi",
      "Apakah Anda yakin ingin mengatur ulang data kembali ke data contoh awal (initial data)? Seluruh transaksi tambahan akan dihapus.",
      [
        { text: "Batal", style: "cancel" },
        {
          text: "Ya, Reset",
          style: "destructive",
          onPress: () => {
            resetTransactions();
            Alert.alert(
              "Sukses",
              "Data transaksi berhasil direset ke data awal.",
            );
          },
        },
      ],
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={colors.headerBg} />
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <Header title="Profil Saya" subtitle="Pengaturan Akun & Keuangan" />

        <View style={styles.body}>
          <View style={styles.profileCard}>
            <View style={styles.avatarCircle}>
              <Text style={styles.avatarInitials}>
                {userProfile.avatarInitials}
              </Text>
            </View>
            <Text style={styles.userName}>{userProfile.name}</Text>
            <Text style={styles.userEmail}>{userProfile.email}</Text>
            <Text style={styles.userRole}>{userProfile.occupation}</Text>

            <TouchableOpacity
              style={styles.editProfileBtn}
              onPress={handleOpenEditModal}
              activeOpacity={0.8}
            >
              <Feather name="edit-2" size={14} color={colors.white} />
              <Text style={styles.editProfileBtnText}>Edit Profil</Text>
            </TouchableOpacity>

            <View style={styles.statsRow}>
              <View style={styles.statBox}>
                <Text style={styles.statLabel}>Total Saldo</Text>
                <Text style={styles.statValue}>{formatCurrency(balance)}</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statBox}>
                <Text style={styles.statLabel}>Total Transaksi</Text>
                <Text style={styles.statValue}>{transactions.length}</Text>
              </View>
            </View>
          </View>

          <View style={styles.menuSection}>
            <Text style={styles.menuSectionTitle}>Preferensi Akun</Text>

            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => navigation.navigate("Notification")}
              activeOpacity={0.7}
            >
              <View
                style={[
                  styles.menuIconBox,
                  { backgroundColor: colors.surface },
                ]}
              >
                <Ionicons
                  name="notifications-outline"
                  size={20}
                  color={colors.deepPlum}
                />
              </View>
              <View style={styles.menuTextWrap}>
                <Text style={styles.menuItemText}>
                  Pusat Notifikasi & Peringatan Saldo
                </Text>
                {unreadCount > 0 && (
                  <View style={styles.notifBadgePill}>
                    <Text style={styles.notifBadgePillText}>
                      {unreadCount} Baru
                    </Text>
                  </View>
                )}
              </View>
              <Feather
                name="chevron-right"
                size={18}
                color={colors.textMuted}
              />
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem} activeOpacity={0.7}>
              <View
                style={[
                  styles.menuIconBox,
                  { backgroundColor: colors.surface },
                ]}
              >
                <Feather name="clock" size={19} color={colors.deepPlum} />
              </View>
              <Text style={styles.menuItemText}>Pengingat Anggaran Harian</Text>
              <Feather
                name="chevron-right"
                size={18}
                color={colors.textMuted}
              />
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem} activeOpacity={0.7}>
              <View
                style={[
                  styles.menuIconBox,
                  { backgroundColor: colors.surface },
                ]}
              >
                <MaterialCommunityIcons
                  name="cash-multiple"
                  size={20}
                  color={colors.deepPlum}
                />
              </View>
              <Text style={styles.menuItemText}>Mata Uang Default (IDR)</Text>
              <Feather
                name="chevron-right"
                size={18}
                color={colors.textMuted}
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.resetButton}
            onPress={handleResetData}
            activeOpacity={0.85}
          >
            <MaterialCommunityIcons
              name="refresh"
              size={20}
              color={colors.white}
            />
            <Text style={styles.resetButtonText}>Reset Data ke Semula</Text>
          </TouchableOpacity>
          <Text style={styles.resetHelpText}>
            Kembalikan saldo dan riwayat transaksi ke data bawaan awal aplikasi.
          </Text>
        </View>
      </ScrollView>

      <Modal
        visible={isEditModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsEditModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Edit Profil Pengguna</Text>
              <TouchableOpacity
                onPress={() => setIsEditModalVisible(false)}
                style={styles.modalCloseBtn}
              >
                <Feather name="x" size={22} color={colors.deepPlum} />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Nama Lengkap</Text>
                <TextInput
                  style={styles.textInput}
                  value={nameInput}
                  onChangeText={setNameInput}
                  placeholder="Masukkan nama lengkap"
                  placeholderTextColor="#A88B7D"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Alamat Email</Text>
                <TextInput
                  style={styles.textInput}
                  value={emailInput}
                  onChangeText={setEmailInput}
                  placeholder="Masukkan email"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  placeholderTextColor="#A88B7D"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Nomor Handphone</Text>
                <TextInput
                  style={styles.textInput}
                  value={phoneInput}
                  onChangeText={setPhoneInput}
                  placeholder="08xxxxxxxxxx"
                  keyboardType="phone-pad"
                  placeholderTextColor="#A88B7D"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Pekerjaan / Status</Text>
                <TextInput
                  style={styles.textInput}
                  value={occupationInput}
                  onChangeText={setOccupationInput}
                  placeholder="Contoh: Mahasiswa / Freelancer"
                  placeholderTextColor="#A88B7D"
                />
              </View>

              <TouchableOpacity
                style={styles.saveProfileBtn}
                onPress={handleSaveProfile}
                activeOpacity={0.85}
              >
                <Feather name="check" size={18} color={colors.white} />
                <Text style={styles.saveProfileBtnText}>Simpan Perubahan</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.cancelProfileBtn}
                onPress={() => setIsEditModalVisible(false)}
                activeOpacity={0.7}
              >
                <Text style={styles.cancelProfileBtnText}>Batal</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.headerBg,
  },
  container: {
    flex: 1,
    backgroundColor: colors.contentBg,
  },
  contentContainer: {
    paddingBottom: 100,
  },
  body: {
    padding: 18,
  },
  profileCard: {
    backgroundColor: colors.cardBg,
    borderRadius: 20,
    alignItems: "center",
    padding: 22,
    marginBottom: 16,
    shadowColor: colors.deepPlum,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#ECD1B8",
  },
  avatarCircle: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: colors.deepPlum,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
    borderWidth: 3,
    borderColor: colors.softPink,
  },
  avatarInitials: {
    fontSize: 28,
    fontWeight: "800",
    color: colors.peachCream,
  },
  userName: {
    fontSize: 18,
    fontWeight: "800",
    color: colors.deepPlum,
  },
  userEmail: {
    fontSize: 13,
    color: colors.magentaRose,
    marginTop: 2,
    fontWeight: "500",
  },
  userRole: {
    fontSize: 11,
    color: colors.textMuted,
    marginTop: 2,
    marginBottom: 12,
    fontWeight: "600",
  },
  editProfileBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.blushCoral, // #DA627D
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 14,
    elevation: 2,
  },
  editProfileBtnText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: "700",
    marginLeft: 6,
  },
  statsRow: {
    flexDirection: "row",
    width: "100%",
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#F5EAE1",
  },
  statBox: {
    flex: 1,
    alignItems: "center",
  },
  statDivider: {
    width: 1,
    backgroundColor: "#F5EAE1",
  },
  statLabel: {
    fontSize: 11,
    color: colors.magentaRose,
    marginBottom: 4,
    fontWeight: "600",
  },
  statValue: {
    fontSize: 14,
    fontWeight: "800",
    color: colors.deepPlum,
  },
  menuSection: {
    backgroundColor: colors.cardBg,
    borderRadius: 18,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#ECD1B8",
    elevation: 2,
    shadowColor: colors.deepPlum,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
  },
  menuSectionTitle: {
    fontSize: 14,
    fontWeight: "800",
    color: colors.deepPlum,
    marginBottom: 12,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F7EDE4",
  },
  menuIconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  menuTextWrap: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  menuItemText: {
    flex: 1,
    fontSize: 13,
    fontWeight: "700",
    color: colors.deepPlum,
  },
  notifBadgePill: {
    backgroundColor: colors.blushCoral,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    marginRight: 8,
  },
  notifBadgePillText: {
    color: colors.white,
    fontSize: 10,
    fontWeight: "800",
  },
  resetButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.magentaRose,
    paddingVertical: 16,
    borderRadius: 16,
    shadowColor: colors.magentaRose,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 4,
  },
  resetButtonText: {
    fontSize: 14,
    fontWeight: "800",
    color: colors.white,
    marginLeft: 8,
    letterSpacing: 0.5,
  },
  resetHelpText: {
    fontSize: 11,
    color: colors.deepPlum,
    textAlign: "center",
    marginTop: 8,
    fontWeight: "500",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(69, 9, 32, 0.55)",
    justifyContent: "flex-end",
  },
  modalCard: {
    backgroundColor: colors.cardBg,
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
    paddingHorizontal: 22,
    paddingTop: 20,
    paddingBottom: 36,
    maxHeight: "80%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#F5EAE1",
    paddingBottom: 12,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: colors.deepPlum,
  },
  modalCloseBtn: {
    padding: 4,
  },
  inputGroup: {
    marginBottom: 14,
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.magentaRose,
    marginBottom: 6,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#ECD1B8",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 14,
    color: colors.deepPlum,
    backgroundColor: colors.surface,
    fontWeight: "600",
  },
  saveProfileBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.blushCoral,
    paddingVertical: 14,
    borderRadius: 16,
    marginTop: 10,
    elevation: 3,
  },
  saveProfileBtnText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: "800",
    marginLeft: 6,
  },
  cancelProfileBtn: {
    alignItems: "center",
    paddingVertical: 12,
    marginTop: 4,
  },
  cancelProfileBtnText: {
    fontSize: 13,
    color: colors.textMuted,
    fontWeight: "700",
  },
});

export default ProfileScreen;
