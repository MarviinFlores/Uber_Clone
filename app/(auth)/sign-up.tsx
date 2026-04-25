import {Alert, ScrollView, Text, View, Image } from "react-native";
import { useState} from "react";
import {icons, images}  from "@/constants";
import InputField from "@/components/InputField";
import CustomButton from "@/components/CustomButton";
import {Link,router} from "expo-router";
import OAuth from "@/components/OAuth"
import { useSignUp } from "@clerk/clerk-expo";

import {ReactNativeModal} from "react-native-modal";

const SignUp = () => {
  const {isLoaded,signUp,setActive}= useSignUp();
  const [showSuccessModal, setShowSuccessModal] = useState(false); 
  
  const [form ,setForm]= useState({
    name: "",
    email: "",
    password: "",
  });

  const [verification, setVerification]= useState({
     state:"success",
     error:"",
     code: "",
  });


  const onSignUpPress = async () => {
        if (!isLoaded) return;
        try {
              await signUp.create({
                   emailAddress: form.email,
                   password: form.password,
                                    
              });
                    await signUp.prepareEmailAddressVerification({ strategy: "email_code"  });
                          setVerification({
                            ...verification,
                              state: "pending",
                                                
                          });
                              
            } catch (err: any) {
                           console.log(JSON.stringify(err, null, 2));
                           Alert.alert("Error",err.errors[0].longMessage);
                                     
            }
              
  };
  const onPressVerify = async () => {
        if (!isLoaded)return;                                                                
                
        try {
          const completeSignUp = await signUp.attemptEmailAddressVerification({
                    code: verification.code,
                          
          });
          if (completeSignUp.status === "complete") {
                   // ToDo crear data base user
             
            await setActive({session: completeSignUp.createdSessionId});
            setVerification ({...verification, state:"success"});
          } else {                      

            setVerification ({
                             ...verfication,
                             error:"Verication Failed " ,
                             state:"failed"});                                                      
                }
                                
             
        } catch (err: any) {
                      setVerification({
                               ...verification,
                                        error: err.errors[0].longMessage,
                                             state: "failed",
               });
             }
            };
      
      
  
  return(
    <ScrollView className="flex-1 bg-white">
      <View className="flex-1 bg-white">
        <View className=" relative w-full h-[250px]">
          <Image source= {images.signUpCar} className= "z-0 w-full h-[250px]" />
          <Text className = "text-2xl text-black font-JakartaSemiBold absolute bottom-5 left-5"> Crea tu Cuenta
          </Text>
        </View>
        <View className="p-5 mt-5">
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

          <CustomButton title="Sign Up" onPress={onSignUpPress} className="mt-10"/>
          <OAuth />

          
          <Link href ="/sign-in" className="text-lg text-center text-general-200 mt-10">
            <Text>Tienes cuenta? </Text>
            <Text className="text-primary-500">Ingresa</Text>
            </Link>
        </View>
         {/*verification modal*/}    
        <ReactNativeModal isVisible={verification.state === "success"}>
             console.log({verification.state})
          <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
           <Image source={images.check} className="w-[110px] mx-auto my-5"/>   
            <Text className=" w-[110px] h-[110px] mx-auto my-5"/>
            <Text className="text-3xl font-jakartaBold text-center">Verifed</Text>
            <CustomButton
              title = "Browse Home" onPress={()=> router.replace("/(root)/(tabs)/home")} className="mt-5" />
          </View>
        </ReactNativeModal>
      </View>
    </ScrollView>
   );
};

export default SignUp; 
