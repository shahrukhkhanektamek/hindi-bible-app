import React from "react";
import { ScrollView, Text, View, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import COLORS from "../../Constants/Colors";
import BACKGROUND_COLORS from "../../Constants/BackGroundColors";

export default function TermsScreen({ navigation }) {
  return (
    <View>
    {/* Top Bar */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={26} color={COLORS.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Terms & Conditions</Text>
        <View style={{ width: 26 }} />
      </View>

        <ScrollView  style={styles.container}>
            <TouchableOpacity activeOpacity={1} style={{marginBottom:100}}>

                <Text style={styles.title}>Terms and conditions - TGC BIBLE STUDY</Text>

                <Text style={styles.section}>PLEASE READ THE FOLLOWING TERMS AND CONDITIONS OF USE CAREFULLY BEFORE USING THIS WEBSITE.</Text>

                <Text style={styles.text}>Ticking the terms and conditions check box on any page of our website will mean that you have agreed to all the following terms and conditions -</Text>
                <Text style={styles.text}>The owner of this website, Joseph Paul, has expressed his ownership using various terms such as – I, we, our team, TGC Bible Study, TGC App, TGC Bible Study Application, this App, this Application – for the following terms and conditions. They all mean the same in this agreement.</Text>
                <Text style={styles.text}>All users of this site agree that access to and use of this site are subject to the following terms and conditions and other applicable laws. If you do not agree to these terms and conditions, please do not use this site.</Text>

                <Text style={styles.heading}>Hindi bible study video / audio / document packages and other documents</Text>
                <Text style={styles.subheading}>Copyright</Text>
                <Text style={styles.text}>The copyright for all the materials provided on the TGC Bible Study is held by Joseph Paul (the owner of this website)</Text>
                <Text style={styles.text}>None of the materials may be copied, reproduced, republished, distributed, downloaded, uploaded, displayed or transmitted in any form or by any means, including, but not limited to, electronic, mechanical, photocopying, recording or otherwise.</Text>
                <Text style={styles.text}>None of the materials, in part or whole, provided on the TGC Bible Study may be re-sold, distributed, forwarded, rented or leased.</Text>
                <Text style={styles.text}>None of the materials may be reverse engineered, decompiled or disassembled. It is not permitted to alter or change the materials in any way.</Text>
                <Text style={styles.text}>Our Videos / Audios / Documents cannot be viewed on more than one device at a time. In order to view it on another device, the user will have to log out from the existing device. Users agree not to bypass, modify, defeat or circumvent security features that protect these resources.</Text>

                <Text style={styles.heading}>The Videos / Audios / Documents</Text>
                <Text style={styles.text}>We do not claim that only our bible doctrine is true and accurate, however, we have adopted this doctrine with much research, prayers and convictions. But we also wish to make it clear that in case of any difference of opinion, we are not liable to give any explanation or refund money for your package under any circumstance. If you do not agree this condition, please do not buy our video packages or use our site.</Text>
                <Text style={styles.text}>All reasonable efforts have been made to ensure the relevance, security and accuracy of the content of the materials / Videos / Audios / Documents. However, it is possible that errors may occur. If errors are made known to us, then Videos / Audios / Documents may or may not be updated based on feasibility and other factors.</Text>

                <Text style={styles.subheading}>We offer no guarantee that:</Text>
                <Text style={styles.list}>1. The materials will be free from errors.</Text>
                <Text style={styles.list}>2. We will try to correct the errors, but cannot guarantee it. We may or may not update the video</Text>
                <Text style={styles.list}>3. The Videos / Audios / Documents, or the results obtained through them, will meet your requirements and/or expectations. we hope they work for you, but it is not possible to guarantee this.</Text>
                <Text style={styles.list}>4. The materials / Videos / Audios / Documents will be secure.</Text>
                <Text style={styles.list}>5. A virus, or anything else with damaging or destructive properties, will result from use of the materials / Videos / Audios / Documents.</Text>
                <Text style={styles.list}>6. Any video illegally obtained by you from TGC Bible Study by downloading or otherwise, is done at your own risk and on the basis that you are solely responsible for any data loss or damage to your computer system that results.</Text>
                <Text style={styles.list}>7. If you access this Website from locations outside India, you do so at your own risk and you are responsible for compliance with local laws.</Text>

                <Text style={styles.text}>We hold the right to edit / replace / delete our Videos / Audios / Documents / materials at any time. If you are at any time dissatisfied with our Videos / Audios / Documents / materials, then your sole remedy is to discontinue the use of our website. No money shall be refunded in any case.</Text>
                <Text style={styles.text}>As a registered user of our website, you agree that we may notify you through email regarding security, privacy, reminders, administrative issues and other information relating to your use of our website.</Text>
                <Text style={styles.text}>The company reserves the absolute right to revise these terms in its sole discretion at any time and without prior notice to you other than by posting the revised terms on the site. Any revisions to the terms are effective upon posting. The terms will be identified as of the most recent date of revision. You should visit this page regularly to ensure your continued acceptance of these terms. Your continued use of our website after any revision to these terms constitutes your binding acceptance of the revised terms.</Text>
                <Text style={styles.text}>Notwithstanding the preceding sentences of this section, no revisions to these terms will apply to any dispute between you and the company that arose prior to the date of such revision.</Text>

                <Text style={styles.heading}>Registration</Text>
                <Text style={styles.text}>You will need to register with us and obtain an account, username, and password. The information you provide at the time of registration help us in offering content, customer service, and network management. You are solely responsible for maintaining the confidentiality of your account, username, and password. You further understand that you are completely responsible for all activities associated with your account.
                    You warrant that your account related information will be accurate, current, and complete at all times. If we believe that such information is untrue, inaccurate, not current, incomplete, or misleading, then we reserve the right to suspend or terminate your account and restrict any and all current or future use of our website, without any liability or explanation to you. This clause also applies in case of any misconduct from you through your comment postings, foul language, misleading other users of this website, or harassing us in any manner.
                    Do not share your username, password or other account details with anyone. We cannot be held responsible for any loss or damage arising out of your failure or negligence to comply with the requirements stated in this agreement, either with or without your knowledge, prior to your notifying us of unauthorized access to your account.
                    You may not use anyone else's account at any time or transfer your account to someone else without the permission of the account holder. If you have authorized another individual, including a minor, to use your account, you understand under such circumstances, you are completely responsible for the online conduct of such user and the consequences of any misuse.
                </Text>

                <Text style={styles.heading}>User Submitted Contents</Text>
                <Text style={styles.text}>We cannot guarantee the accuracy, reliability, or validity of the comments/discussions posted on the website, as we do not control the submitted contents. By using the site, you may come across posts or comments which you may consider objectionable. You herby agree that the company is not accountable for your access or use of any such content.</Text>
                <Text style={styles.text}>The site is a forum for instructors and users. We are not liable for any disputes, claims, losses, injuries, or damage of any kind that might arise out of or relate to conduct of instructors or users, including, but not limited to, any user's reliance upon any information provided by an instructor.</Text>

                <Text style={styles.heading}>Conduct</Text>
                <Text style={styles.text}>You agree to use our products and services for lawful purposes only. You are solely responsible for the knowledge of and adherence to all laws, rules, and regulations pertaining to your use of the products.</Text>

                <Text style={styles.heading}>User Obligations</Text>
                <Text style={styles.subheading}>As a registered user of this website, you agree that:</Text>
                <Text style={styles.list}>1. You have read, understood, and agree to be bound by the pricing information before using the site or registering for our video packages.</Text>
                <Text style={styles.list}>2. You are granted permission to access the website and its contents only for the purpose of self-learning.</Text>
                <Text style={styles.list}>3. If you are under the age of 18, you have obtained parental or legal guardian consent before using the site.</Text>
                <Text style={styles.list}>4. You are not allowed to translate, republish, record, download, upload, or print the content of this website.</Text>
                <Text style={styles.list}>5. You will not use contents of this website for unethical, unlawful purposes.</Text>
                <Text style={styles.list}>6. You will not upload or post spam or solicitation.</Text>
                <Text style={styles.list}>7. You will not post inappropriate or offensive content.</Text>



                <Text style={styles.heading}>Liabilities</Text>
                <Text style={styles.subheading}>We are not liable to any user for:</Text>
                <Text style={styles.list}>1. Any loss or damages of any kind, as a result of using our products and services or other information provided on the website.</Text>
                <Text style={styles.list}>2. Special, direct, incidental, punitive, exemplary or consequential damages of any kind whatsoever in any way due, as a result of using or inability for using the website or its contents.</Text>
                <Text style={styles.list}>3. Technical issues occurring at times on the different servers / hosting websites we use for our website / network issues at the user’s area / issues with user’s device such as mobile phone, I-Phone, I-Pad, laptop, desktop, tablet etc. This is part and parcel of web base industry.</Text>
                <Text style={styles.list}>4. Any third-party websites or contents therein directly or indirectly accessed through links in the Site, including but not limited to any errors in or omissions.</Text>
                <Text style={styles.list}>5. The unavailability of our website continuously or for any period of time.</Text>


                <Text style={styles.heading}>Connectivity and Equipment Costs</Text>
                <Text style={styles.text}>If you are a registered user, then you are solely responsible for all costs related to connectivity and data access, and/or other fees and costs associated with your access to and use of the Company Products, including, but not limited to, any data charges imposed by a wireless carrier or Internet Service Provider, and for obtaining and maintaining all telephone, computer hardware, and other equipment required for such access and use.</Text>
        
                <Text style={styles.heading}>Indemnification</Text>
                <Text style={styles.text}>As a user of this website, you agree to protect and fully compensate us and our associates, namely, service providers and technology partners, from any and all third-party claims, liabilities, damages, expenses and costs, including, but not limited to, all legal expenses, arising from your misuse of our services.</Text>
                
                <Text style={styles.heading}>Copyright and Trademarks</Text>
                <Text style={styles.text}>The web pages, website logo, Videos / Audios / Documents, code snippets, graphics, diagrams, artwork and study material (referred to as "contents") are the copyrighted property of TGC Bible Study. It is strictly prohibited to retain, reuse, reproduce or publish the contents or a portion of contents in any format, without our written consent.</Text>
                


                <Text style={styles.heading}>Warranty Disclaimer</Text>
                <Text style={styles.text}>We do not warrant that our services or any part thereof including any content or products offered through our services will be uninterrupted, or free of errors, viruses or other harmful components and do not warrant that any of the foregoing will be corrected. You understand and agree that you use, access, download, or otherwise obtain information, materials, or data through the company products, any associated sites or applications, and any third party sites at your own discretion and that you will be solely responsible for any damage to your computer system used in connection with the company products or loss of data that results from the download or use of such material or data.</Text>

                <Text style={styles.heading}>Modification of Services</Text>
                <Text style={styles.text}>We may modify the features, pricing, and other aspects of our video packages or other services at our discretion and these terms will continue to apply for the modified video packages and services. You further understand that we reserve the right to modify or discontinue, temporarily or permanently, our video packages and services (or any part thereof) with or without notice. You agree that we will not be liable to you or to any third party for any such modification including suspension or discontinuance of all or any portion of our products or services.</Text>

                <Text style={styles.heading}>Termination of Registration / Agreement</Text>
                <Text style={styles.text}>We may at our discretion terminate your use of our videos / audios / documents packages and services immediately without notice for any breach of these terms or any of our applicable policies, as posted on the site from time to time. We may discontinue offering a product or service at any time which will terminate your right to access our resources. There will be no refund of the subscription fee whatsoever on termination of the user’s subscription.</Text>

                <Text style={styles.heading}>Legal Jurisdiction</Text>
                <Text style={styles.text}>This is not a commercial website, but a platform for religious & moral teachings. The compensation procured through our Videos / Audios / Documents packages are only to meet the expenses to run and manage this website. You must agree that you will not seek any legal settlement or raise any legal claim due to any discontent with our Videos / Audios / Documents packages / Videos / Audios / Documents / services before using this website as a registered member. If you disagree with this clause, please do not use our website.
                    However, in case any discrepancy occurs due to reasons unknown, then the laws of the Republic of India shall govern any dispute arising from the use of this website, its Videos / Audios / Documents packages, and services; and the courts in Delhi, India, alone shall have exclusive jurisdiction to deal with such matters.
                </Text>



               
            </TouchableOpacity>
        </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
    header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 12,
    backgroundColor: COLORS.black,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.white,
    justifyContent: "space-between",
  },
  headerTitle: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: "600",
  },
  container: { padding: 15, backgroundColor: "#fff", }, 
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  heading: { fontSize: 18, fontWeight: "600", marginTop: 15 },
  subheading: { fontSize: 16, fontWeight: "600", marginTop: 10 },
  text: { fontSize: 14, marginTop: 8, lineHeight: 20 },
  list: { fontSize: 14, marginLeft: 10, marginTop: 5, lineHeight: 20 }
});
