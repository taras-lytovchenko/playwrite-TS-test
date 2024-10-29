import {AppComponent} from "../../appComponent";

export class CustomerData extends AppComponent{
    static generateEmail(email: string): string {
        const emailParts = email.split("@");
        const unixTime = Date.now();
        const uniqueValue = (unixTime % 10000).toString().padStart(4, '0');
        const uniqueUserName = `${emailParts[0]}+${uniqueValue}`;
        const uniqueEmail = `${uniqueUserName}@${emailParts[1]}`;
        console.log("Unique email: " + uniqueEmail);
        return uniqueEmail;
    }
}