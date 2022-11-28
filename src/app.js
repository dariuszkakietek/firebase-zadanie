import "./../styles/styles.css";

import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAU5GVlnfSvr5qltGipU_exew4mXat4bOM",
  authDomain: "ticketownia-9c041.firebaseapp.com",
  projectId: "ticketownia-9c041",
  storageBucket: "ticketownia-9c041.appspot.com",
  messagingSenderId: "191488753812",
  appId: "1:191488753812:web:b493027280998d08eb7481",
};

const app = initializeApp(firebaseConfig);

const storage = getStorage(app);
const db = getFirestore(app);

const sendBtn = document.getElementById("sendBtn");
const ticketsCollection = collection(db, "tickets");

sendBtn.addEventListener("click", (event) => {
  event.preventDefault();

  const file = document.getElementById("file").files[0];
  const errorMsg = document.querySelector(".error");

  if (!file || title.value === "" || description.value === "") {
    errorMsg.innerText = "Usupełnij wszystkie pola!";
  } else {
    const title = document.getElementById("title");
    const description = document.getElementById("description");

    const fileRef = ref(storage, file.name);

    uploadBytes(fileRef, file).then((result) => {
      getDownloadURL(fileRef).then((url) => {
        addDoc(ticketsCollection, {
          Title: title.value,
          Description: description.value,
          Image: url,
        });

        createTicketsList();
        errorMsg.innerText = "";
      });
    });
  }
});

const createTicketsList = () => {
  getDocs(ticketsCollection).then((docs) => {
    const tickets = document.getElementById("tickets");
    tickets.innerHTML = "";

    docs.forEach((ticketDoc) => {
      const ticket = ticketDoc.data();
      console.log(ticket);

      const listTitle = document.createElement("h1");
      listTitle.innerText = "Otwarte zgłoszenia: ";
      const ticketDiv = document.createElement("div");
      ticketDiv.classList.add("ticket-wrapper");
      const ticketTitle = document.createElement("h2");
      const ticketDescription = document.createElement("p");
      const ticketImage = document.createElement("img");
      ticketTitle.innerText = ticket.Title;
      ticketDescription.innerText = ticket.Description;
      ticketImage.src = ticket.Image;
      ticketDiv.appendChild(listTitle);
      ticketDiv.appendChild(ticketTitle);
      ticketDiv.appendChild(ticketDescription);
      ticketDiv.appendChild(ticketImage);

      tickets.appendChild(ticketDiv);
    });
  });
};

createTicketsList();
