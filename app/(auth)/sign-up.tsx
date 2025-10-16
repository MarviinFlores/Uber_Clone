import {ScrollView, Text, View, Image } from "react-native";
import { useState } from "react";
import {icons, images}  from "@/constants";
import InputField from "@/components/InputField";
import CustomButton from "@/components/CustomButton";

const SignUp = () => 
  {
  const [form ,setForm]= useState({
    name: "",
    email: "",
    password: "",
  });

  const onSingUpPress = async () => {};

  return(
    <ScrollView className="flex-1 bg-white">
      <View className="flex-1 bg-white">
        <View className=" relative w-full h-[250px]">
          <Image source= {images.signUpCar} className= "z-0 w-full h-[250px]" />
          <Text className = "text-2xl text-black font-JakartaSemiBold absolute bottom-5 left-5"> 
            Crea tu Cuenta
          </Text>
        </View>
        <View className="p-5">
          <InputField 
            label = "Nombre"
            placeholder= "Tu Nombre"
            icon ={icons.person}
            value={form.name}
            onChangeText= {(value)=>setForm( { ...form, name: value})} />
          <InputField 
             label = "Email"
            placeholder= "Tu Email"
            icon ={icons.email}
            textContextType ="emailAdress"
            value={form.email}
            onChangeText= {(value)=>setForm( { ...form, email: value})} />
           <InputField 
             label = "Contrasena"
            placeholder= "Contrasena"
            icon ={icons.lock}
            value={form.password}
            onChangeText= {(value)=>setForm( { ...form, password: value})} />

          <CustomButton title="Sign Up" onPress={onSingUpPress} className="mt-10"/>
          
        </View>
      </View>
    </ScrollView>
   );
};

export default SignUp; 
