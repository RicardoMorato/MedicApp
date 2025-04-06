import HeaderProfile from "@/components/HeaderProfile";
import React from "react";
import { View } from "react-native";
import { styles } from "./style";
import FontLoader from "../../components/FontLoader";
import HeaderTittle from "@/components/HeaderTittle";
import PageContent from "@/components/AddedDrugs";

function Profile() {
  return (
    <>
      <FontLoader>
        <View style={styles.container}>
          <HeaderTittle title="Meu Perfil" />
          <PageContent />
        </View>
      </FontLoader>
    </>
  );
}

export default Profile;
