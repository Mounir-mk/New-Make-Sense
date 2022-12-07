import cat from "../images/cat.jpg";
import Louen from "../images/Louen.jpg";
import Tracteur from "../images/Tracteur.jpg";
import Heri from "../images/Heri.jpg";
import Marty from "../images/Marty.jpg";
import Rick from "../images/Rick.jpg";

export default function Decision() {
  return (
    <body>
      <div className="leading-normal bg-green-100 h-screen w-screen py-5 px-5 text-justify">
        <h1 className="text-4xl">
          <p className="float-right mx-5 text-xl">Robin Kolasinski</p>
          <img src={cat} alt="user" className="float-right ml-5 w-13 h-12 " />
          <p>Réintégration à la Wild</p>
        </h1>
        <div className="flex flex-wrap -mx-2 my-6">
          <div className=" p-2 w-3/5 ml-10">
            <div className="bg-gray-600 p-4">
              <details>
                <summary className="text-2xl">Détails de la décision</summary>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Explicabo, eum voluptatum est deserunt quam a doloribus dolorem
                ad minima, illum aperiam natus sit hic ipsa odit dolor incidunt
                magni culpa.
              </details>
            </div>
          </div>
          <div className=" static p-2 w-1/5">
            <div className="fixed bg-gray-400 text-xl p-4">
              <p>Dates à retenir</p>

              <ol className="relative border-l border-gray-200 dark:border-gray-700">
                <li className="mb-10 ml-4">
                  <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700" />
                  <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                    February 2022
                  </time>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Application UI code in Tailwind CSS
                  </h3>
                  <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
                    Get access .
                  </p>
                </li>
              </ol>
            </div>

            <div className="fixed bg-gray-400 my-48 text-xl p-4">
              <p>Personnes impactées</p>
              <div className="flex">
                <img
                  src={Heri}
                  alt="user"
                  className="object-fill rounded-full w-10 h-10 hover:z-10"
                />
                <img
                  src={Louen}
                  alt="user"
                  className="object-fill rounded-full w-10 h-10 -ml-2 hover:z-10"
                />
                <img
                  src={Tracteur}
                  alt="user"
                  className="object-fill rounded-full w-10 h-10 -ml-2 hover:z-10"
                />
              </div>
              <button type="button" className="absolute bg-gray-600 text-sm ">
                Voir les avis
              </button>
            </div>
            <div className=" fixed bg-gray-400 my-80 text-xl p-4">
              <p>Personnes expertes</p>
              <div className="flex ">
                <img
                  src={Rick}
                  alt="user"
                  className="object-fill rounded-full w-10 h-10 hover:z-10"
                />
                <img
                  src={Marty}
                  alt="user"
                  className="object-fill rounded-full w-10 h-10 -ml-2 hover:z-10"
                />
              </div>
              <button type="button" className="absolute  bg-gray-600 text-sm">
                Voir les avis
              </button>
            </div>
          </div>
          <div className=" p-2 w-3/5 ml-10">
            <div className="bg-gray-600 p-4 ">
              <details>
                <summary className="text-2xl">
                  Impact sur l'organisateur
                </summary>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Explicabo, eum voluptatum est deserunt quam a doloribus dolorem
                ad minima, illum aperiam natus sit hic ipsa odit dolor incidunt
                magni culpa.
              </details>
            </div>
          </div>
          <div className=" p-2 w-3/5 ml-10">
            <div className="bg-gray-600 p-4 ">
              <details>
                <summary className="text-2xl">Bénéfices</summary>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Explicabo, eum voluptatum est deserunt quam a doloribus dolorem
                ad minima, illum aperiam natus sit hic ipsa odit dolor incidunt
                magni culpa.
              </details>
            </div>
          </div>
          <div className=" p-2 w-3/5 ml-10">
            <div className="bg-gray-600 p-4  ">
              <details>
                <summary className="text-2xl">Risques potentiels</summary>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Explicabo, eum voluptatum est deserunt quam a doloribus dolorem
                ad minima, illum aperiam natus sit hic ipsa odit dolor incidunt
                magni culpa.
              </details>
            </div>
          </div>
          <div className=" p-2 w-3/5 ml-10">
            <div className="bg-gray-600 p-4  ">
              <details>
                <summary className="text-2xl">Avis</summary>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Explicabo, eum voluptatum est deserunt quam a doloribus dolorem
                ad minima, illum aperiam natus sit hic ipsa odit dolor incidunt
                magni culpa.
              </details>
            </div>
          </div>
          <div className=" p-2 w-3/5 ml-10">
            <div className="bg-gray-600 p-4 ">
              <details>
                <summary className="text-2xl">Première décision</summary>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Explicabo, eum voluptatum est deserunt quam a doloribus dolorem
                ad minima, illum aperiam natus sit hic ipsa odit dolor incidunt
                magni culpa.
              </details>
            </div>
            <button
              type="button"
              className="absolute border-black rounded-md bg-white border-2 text-sm m-4 p-4"
            >
              Donner son avis
            </button>
          </div>
        </div>
      </div>
    </body>
  );
}
