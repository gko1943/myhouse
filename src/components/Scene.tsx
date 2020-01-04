import * as React from "react";
import * as THREE from "three";

export default class Scene extends React.Component {
  private canvasBox: React.RefObject<HTMLDivElement>;

  constructor(props, context) {
    super(props, context);
    this.state = {};
    this.canvasBox = React.createRef<HTMLDivElement>();
  }

  componentDidMount() {
    const scene = new THREE.Scene();
    const renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0xeeeeee);
    renderer.setSize(window.innerWidth, window.innerHeight);

    const axes = new THREE.AxesHelper(20);
    scene.add(axes);

    const planeGeometry = new THREE.PlaneGeometry(60, 20, 1, 1);
    const planeMeterial = new THREE.MeshBasicMaterial({ color: 0xcccccc });
    const plane = new THREE.Mesh(planeGeometry, planeMeterial);
    plane.rotation.x = -0.5 * Math.PI;
    plane.position.x = 15;
    plane.position.y = 0;
    plane.position.z = 0;
    scene.add(plane);

    const cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
    const cubeMaterial = new THREE.MeshBasicMaterial({
      color: 0xff0000,
      wireframe: true
    });
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.position.x = -4;
    cube.position.y = 3;
    cube.position.z = 0;
    scene.add(cube);

    this.canvasBox.current.appendChild(renderer.domElement);

    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.x = -30;
    camera.position.y = 40;
    camera.position.z = 30;
    camera.lookAt(scene.position);
    renderer.render(scene, camera);
  }

  render() {
    return <div className="canvasBox" ref={this.canvasBox} />;
  }
}
