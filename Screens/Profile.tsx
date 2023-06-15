import { Text, View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native";


const Profile = () => {
    return (
    <ScrollView>
        <SafeAreaView>
            <View style={{
                paddingHorizontal: 24,
                paddingVertical: 24,
                flexDirection: "row",
                alignItems: "center",
                gap: 8
            }}>
                <Text> Profile</Text>

            </View>
        </SafeAreaView>
    </ScrollView>
    )
     
} 

export default Profile;