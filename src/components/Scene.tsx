import * as React from "react";
import * as THREE from "three";

export default class Scene extends React.Component {
  private canvasBox: React.RefObject<HTMLDivElement>;
  private scene: any;//THREE.Scene;
  private renderer: any;//THREE.Renderer;
  private camera: any;//THREE.Camera;
  private cube: any;//THREE.Mesh;

  constructor(props: any, context: any) {
    super(props, context);
    this.state = {};
    this.canvasBox = React.createRef<HTMLDivElement>();

    this.renderScene = this.renderScene.bind(this);
  }

  componentDidMount() {
    const scene = new THREE.Scene();
    this.scene = scene;

    const light = new THREE.SpotLight(0xffffff);
    light.castShadow = true;
    light.position.set(10, 30, 20);
    scene.add(light);

    const lightHelper = new THREE.SpotLightHelper(light);
    scene.add(lightHelper);

    const renderer = new THREE.WebGLRenderer();
    this.renderer = renderer;
    renderer.setClearColor(new THREE.Color(0xeeeeee));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    const axes = new THREE.AxesHelper(20);
    scene.add(axes);

    this.addPlane();
    this.cube = this.addCube(0, 4, 0);
    this.addSphere();

    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.x = -30;
    camera.position.y = 40;
    camera.position.z = 30;
    camera.lookAt(this.scene.position);
    this.camera = camera;

    this.canvasBox.current && this.canvasBox.current.appendChild(renderer.domElement);
    this.renderScene();
  }

  renderScene() {
    this.cube.rotation.x += 0.02;
    this.cube.rotation.y += 0.02;
    requestAnimationFrame(this.renderScene);
    this.renderer.render(this.scene, this.camera);
  }

  addPlane() {
    const planeGeometry = new THREE.PlaneGeometry(60, 20, 1, 1);
    const planeMeterial = new THREE.MeshLambertMaterial({ color: 0xcccccc });
    const plane = new THREE.Mesh(planeGeometry, planeMeterial);
    plane.rotation.x = -0.5 * Math.PI;
    plane.position.x = 15;
    plane.position.y = 0;
    plane.position.z = 0;
    plane.receiveShadow = true;
    this.scene.add(plane);
  }

  addCube(x = 0, y = 0, z = 0) {
    const cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
    const cubeMaterial = new THREE.MeshLambertMaterial({
      color: 0xff0000,
      wireframe: false
    });
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.position.x = x;
    cube.position.y = y;
    cube.position.z = z;
    cube.castShadow = true;
    this.scene.add(cube);
    return cube;
  }

  addSphere() {
    const sphereGometry = new THREE.SphereGeometry(4, 20, 20);
    const sphereMeterial = new THREE.MeshPhongMaterial({
      color: 0x7777ff,
      wireframe: false
    });
    const sphere = new THREE.Mesh(sphereGometry, sphereMeterial);
    sphere.position.x = 20;
    sphere.position.y = 4;
    sphere.position.z = 2;
    sphere.castShadow = true;
    this.scene.add(sphere);
  }

  render() {
    return <div className="canvasBox" ref={this.canvasBox} />;
  }
}
