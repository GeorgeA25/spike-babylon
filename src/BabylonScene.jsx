// src/BabylonScene.jsx
import "@babylonjs/loaders/glTF";
import React, { useEffect, useRef } from "react";
import {
  Engine,
  Scene,
  ArcRotateCamera,
  Vector3,
  HemisphericLight,
  MeshBuilder,
  StandardMaterial,
  Color3,
  SceneLoader,
} from "@babylonjs/core";

const BabylonScene = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const engine = new Engine(canvasRef.current, true);
    const scene = new Scene(engine);

    const camera = new ArcRotateCamera(
      "camera",
      0,
      5,
      10,
      Vector3.Zero(),
      scene
    );
    camera.attachControl(canvasRef.current, true);

    new HemisphericLight("light", new Vector3(0, 1, 0), scene);

    const sphere = MeshBuilder.CreateSphere("sphere", { diameter: 2 }, scene);
    const material = new StandardMaterial("material", scene);
    material.diffuseColor = new Color3(1, 0, 0);
    sphere.material = material;
    sphere.position.y = 3;

    MeshBuilder.CreateGround(
      "ground",
      { width: 12, height: 12, subdivisions: 2 },
      scene
    );

    SceneLoader.ImportMesh("", "/models/", "IVAR.glb", scene);

    engine.runRenderLoop(() => {
      scene.render();
    });

    window.addEventListener("resize", () => engine.resize());
    return () => engine.dispose();
  }, []);

  return <canvas ref={canvasRef} style={{ width: "100%", height: "100vh" }} />;
};

export default BabylonScene;
